import { spawn } from "child_process";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { fileURLToPath } from 'url';

// 1. Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Define App Root (Go up one level from /controller/ to /app/)
const APP_ROOT = path.resolve(__dirname, '..');

function runPython(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    // Use absolute path for the script too
    const scriptPath = path.join(APP_ROOT, 'py', 'detection.py');
    
    const py = spawn("python3", [scriptPath, inputPath, outputPath], {
      stdio: ["ignore", "pipe", "pipe"]
    });

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (d) => (stdout += d.toString()));
    py.stderr.on("data", (d) => (stderr += d.toString()));

    py.on("close", (code) => {
      if (code !== 0) return reject(new Error(`Python exited ${code}: ${stderr}`));
      try {
        // Robust parsing: get the last line to avoid "Speed:..." logs
        const lines = stdout.trim().split('\n');
        const lastLine = lines[lines.length - 1];
        resolve(JSON.parse(lastLine));
      } catch (e) {
        reject(new Error(`Failed to parse python JSON.\nRaw Output: ${stdout}\nParse Error: ${e.message}`));
      }
    });
  });
}

const analysisController = {
  async frame(req, res) {
    try {
      if (!req.file) return res.status(400).json({ message: "Image is required (field: image)" });

      const inputPath = req.file.path; // Multer path (usually /tmp or uploads/)

      // 3. Define Output Directory Relative to APP_ROOT
      // Result: /usr/src/app/public/processed
      const outputDir = path.join(APP_ROOT, "public", "processed");

      // Ensure directory exists
      await fs.mkdir(outputDir, { recursive: true });

      const outName = crypto.randomBytes(16).toString("hex") + ".jpg";
      
      // 4. Create Absolute Path for Python to write to
      const outputPath = path.join(outputDir, outName);
        
      // Run Python
      const result = await runPython(inputPath, outputPath);

      // Cleanup uploaded file
      await fs.unlink(inputPath).catch(() => {});

      return res.status(200).json({
        data: result,
        // 5. Return the web-accessible URL (relative to public static serve)
        imageUrl: `/processed/${outName}` 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Napaka pri analizi slike", error: String(err.message || err) });
    }
  },

  async hive(req, res) {
    return res.status(501).json({ message: "Not implemented" });
  }
};

export default analysisController;