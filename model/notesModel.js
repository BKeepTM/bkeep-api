import connection from "../util/database.js";

export default class NotesModel {
    constructor(id, content, time, id_hive) {
        this.id = id;
        this.content = content;
        this.time = time;
        this.id_hive = id_hive;
    }

    static async getAllByUserId(userId) {
        const [results] = await connection.execute(
            `SELECT notes.* 
             FROM notes 
             JOIN hive ON notes.id_hive = hive.id 
             WHERE hive.id_user = ?`,
            [userId]
        );
        return results;
    }
     static async getAll() { // getall metode za admin klice... prosim ne spreminjaj
        try {
            const [results, fields] = await connection.execute(`SELECT location FROM location`);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    static async getByIdForUser(hiveId, userId) {
        const [results] = await connection.execute(
            `SELECT notes.* 
             FROM notes 
             JOIN hive ON notes.id_hive = hive.id 
             WHERE notes.id_hive = ? AND hive.id_user = ?`,
            [hiveId, userId]
        );
        return results ?? null;
    }

    static async hiveBelongsToUser(hiveId, userId) {
        const [results] = await connection.execute(
            `SELECT id FROM hive WHERE id = ? AND id_user = ?`,
            [hiveId, userId]
        );
        return results.length > 0;
    }

    insert() {
        return connection.execute(
            `INSERT INTO notes (content, time, id_hive) VALUES (?, ?, ?)`,
            [this.content, this.time, this.id_hive]
        );
    }

    update() {
        return connection.execute(
            `UPDATE notes SET content = ?, time = ?, id_hive = ? WHERE id = ?`,
            [this.content, this.time, this.id_hive, this.id]
        );
    }

    static async deleteByIdForUser(noteId, userId) {
        return connection.execute(
            `DELETE notes 
             FROM notes 
             JOIN hive ON notes.id_hive = hive.id 
             WHERE notes.id = ? AND hive.id_user = ?`,
            [noteId, userId]
        );
    }
}
