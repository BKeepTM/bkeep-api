import connection from "../util/database.js";

export default class LocationModel {
    constructor(id, longitude, latitude) {
        this.id = id;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute(
                `SELECT location.* , hive.location, hive.name
                 FROM location
                 JOIN hive ON hive.id_location = location.id;`);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;S
        }
    }

    
    static async getById(id) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM location WHERE id = ?', [id]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

     async insert() {
    const [result] = await connection.execute(
      'INSERT INTO location (longitude, latitude) VALUES (?, ?)',
      [this.longitude, this.latitude]
    );

    console.log(result)
    this.id = result.insertId;

    return {
      id: this.id,
      longitude: this.longitude,
      latitude: this.latitude
    };
  }

    update() {
        return connection.execute(
            'UPDATE location SET longitude = ?, latitude = ? WHERE id = ?',
            [this.longitude, this.latitude, this.id]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM location WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute('DELETE FROM location WHERE longitude = ? AND latitude = ? ', 
            [this.longitude, this.latitude]);
    }
};