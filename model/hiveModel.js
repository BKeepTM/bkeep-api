import connection from "../util/database.js";

//tukaj je osnovna struktura tabele Hive, in CRUD metode

export default class HiveModel {
    constructor(id,name,location,type,status,id_location,id_notes,id_user){
    this.id = id;
    this.name = name;
    this.location = location;
    this.type = type;
    this.status = status;
    this.id_location = id_location;
    this.id_notes = id_notes;
    this.id_user = id_user;
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
            'INSERT INTO hive (name, location, type, status, id_location, id_notes, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.name, this.location, this.type, this.status, this.id_location, this.id_notes, this.id_user]
        );
    }

    update() {
        return connection.execute(
            'UPDATE hive SET name = ?, location = ?, type = ?, status = ?, id_location = ?, id_notes = ?, id_user = ? WHERE id = ?',
            [this.name, this.location, this.type, this.status, this.id_location, this.id_notes, this.id_user, this.id]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM hive WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute(
          'DELETE FROM hive WHERE name = ? AND location = ? AND type = ? AND status = ? AND id_location = ? AND id_notes = ? AND id_user = ?',
          [this.name, this.location, this.type, this.status, this.id_location, this.id_notes, this.id_user]
        );
      }
};