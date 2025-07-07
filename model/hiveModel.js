import connection from "../util/database.js";

//tukaj je osnovna struktura tabele Hive, in CRUD metode

export default class HiveModel {
    constructor(id,name,location,type,status,id_location,id_user){
    this.id = id;
    this.name = name;
    this.location = location;
    this.type = type;
    this.status = status;
    this.id_location = id_location;
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

    static async getAllByUserId(userId) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM hive WHERE id_user = ?', [userId]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    static async getById(id, userId) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM hive WHERE id = ? AND id_user = ?', [id, userId]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO hive (name, location, type, status, id_location, id_user) VALUES (?, ?, ?, ?, ?,  ?)',
            [this.name, this.location, this.type, this.status, this.id_location,  this.id_user]
        );
    }

    update() {
        return connection.execute(
            'UPDATE hive SET name = ?, location = ?, type = ?, status = ?, id_location = ?, id_user = ? WHERE id = ?',
            [this.name, this.location, this.type, this.status, this.id_location, this.id_user, this.id]
        );
    }

    static deleteById(id, userId) {
        return connection.execute('DELETE FROM hive WHERE id = ? AND id_user = ?', [id,userId]);
    }

    static deleteByIdAdmin(id) {
        return connection.execute('DELETE FROM hive WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute(
          'DELETE FROM hive WHERE name = ? AND location = ? AND type = ? AND status = ? AND id_location = ? AND id_user = ?',
          [this.name, this.location, this.type, this.status, this.id_location, this.id_user]
        );
      }

    static async search(name, id_user) {
        console.log("ime:",name)
        const [results, fields] = await connection.execute(
         'SELECT * FROM hive WHERE name = ? AND id_user = ? ', [name, id_user]
        );
        return results;
    }
     static async getByLocation(x) { // geopstroske poizvedbe

     }
};