import connection from "../util/database.js";

//tukaj je osnovna struktura tabele Hive, in CRUD metode

export default class Hive {
    constructor(id,name,location,type,status,fk_location,fk_notes){
    this.id = id;
    this.name = name;
    this.location = location;
    this.type = type;
    this.status = status;
    this.fk_location = fk_location;
    this.fk_notes = fk_notes;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM hive');
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    static async getById(id) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM hive WHERE id = ?', [id]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO hive (name, location, type, status, fk_location, fk_notes) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.location, this.type, this.status, this.fk_location, this.fk_notes]
        );
    }

    update() {
        return connection.execute(
            'UPDATE hive SET name = ?, location = ?, type = ?, status = ?, fk_location = ?, fk_notes = ? WHERE id = ?',
            [this.name, this.location, this.type, this.status, this.fk_location, this.fk_notes, this.id]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM hive WHERE id = ?', [id]);
    }

    delete () {
        return connection.execute('DELETE FROM hive WHERE id = ?', [this.id]);
    }
};