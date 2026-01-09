import BlockchainModel from "../model/blockchainModel.js";

class BlockchainController {

    static async getAll(req, res) {
        try {
            const data = await BlockchainModel.getAll();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Napaka pri getAll" });
        }
    }

    static async create(req, res) {
        try {
            const {
                index,
                previousHash,
                timestamp,
                data,
                difficulty,
                token,
                hash
            } = req.body;

            const block = new BlockchainModel(
                index,
                previousHash,
                timestamp,
                data,
                difficulty,
                token,
                hash
            );

            await block.insert();

            res.status(201).json({ message: "Blok dodan" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Napaka pri vstavljanju bloka" });
        }
    }

static async delete(req, res) {
    try {
        const { index } = req.body;

        if (index === undefined) {
            return res.status(400).json({ message: "Manjka index" });
        }

        const block = new BlockchainModel(index);

        const [result] = await block.delete();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blok ni bil najden" });
        }

        res.status(200).json({ message: "Blok izbrisan" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri brisanju bloka" });
    }
}

}

export default BlockchainController;
