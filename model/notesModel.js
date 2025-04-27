import connection from "../util/database.js";

//tukaj je osnovna struktura tabele Notes, in CRUD metode

export default class Notes {
    constructor(id, content, time) {
        this.id = id;
        this.content = content;
        this.time = time;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM notes');
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    
    static async getById(id) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM notes WHERE id = ?', [id]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO notes (content, time) VALUES (?, ?)',
            [this.content, this.time]
        );
    }

    update() {
        return connection.execute(
            'UPDATE notes SET content = ?, time = ? WHERE id = ?',
            [this.content, this.time, this.id]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM notes WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute('DELETE FROM notes WHERE id = ?', [this.id]);
    }
};