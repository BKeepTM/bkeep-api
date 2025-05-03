import connection from "../util/database.js";

//tukaj je osnovna struktura tabele HiveWeight, in CRUD metode

export default class HiveWeightModel {
    constructor(id_hive_weight, weight, time_weight, id_hive) {
        this.id_hive_weight = id_hive_weight;
        this.weight = weight;
        this.time_weight = time_weight;
        this.id_hive = id_hive;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM hive_weight');
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    static async getById(id) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM hive_weight WHERE id = ?', [id]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO hive_weight (weight, time_weight, id_hive) VALUES (?, ?, ?)',
            [this.weight, this.time_weight, this.id_hive]
        );
    }

    update() {
        return connection.execute(
            'UPDATE hive_weight SET weight = ?, time_weight = ?, id_hive = ? WHERE id = ?',
            [this.weight, this.time_weight, this.id_hive, this.id_hive_weight]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM hive_weight WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute('DELETE FROM hive_weight WHERE weight = ? AND time_weight = ? AND id_hive = ?', 
            [this.weight, this.time_weight, this.id_hive]);
    }
};