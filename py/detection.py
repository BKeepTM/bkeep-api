from ultralytics import YOLO
import supervision as sv
import sys
import numpy as np
import json
import cv2
import os

# 1. Setup absolute paths
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "best.pt")

if __name__ == "__main__":
    try:
        input_path = sys.argv[1]
        output_path = sys.argv[2]

        # 2. Load the model
        model = YOLO(model_path)

        # 3. FIX: Read image with OpenCV first to bypass extension check
        # Ultralytics rejects paths without extensions, but accepts numpy arrays.
        image = cv2.imread(input_path)
        
        if image is None:
            raise ValueError(f"OpenCV could not read image at {input_path}. Check file integrity.")

        # 4. Pass the image object (numpy array) instead of the path
        results = model.predict(
            source=image, 
            conf=0.25,
            show=False,
            save=False
        )

        result = results[0]
        detections = sv.Detections.from_ultralytics(result)

        # Count per class
        class_names = model.names
        counts = {}
        for class_id, class_name in class_names.items():
            counts[class_name] = int(np.sum(detections.class_id == class_id))

        # Render annotated image
        annotated = result.plot()
        cv2.imwrite(output_path, annotated)

        # Print JSON for Node
        print(json.dumps({
            "counts": counts,
            "total": int(len(detections)),
            "output_path": output_path
        }))

    except Exception as e:
        # Capture any python error and print as JSON
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)