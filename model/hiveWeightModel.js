const db = require("../util/database.js");

//tukaj je osnovna struktura tabele HiveWeight, in CRUD metode

module.exports = class HiveWeight {
    constructor(id_hive_weight, weight, time_weight, TK_hive, TK_hive1) {
        this.id_hive_weight = id_hive_weight;
        this.weight = weight;
        this.time_weight = time_weight;
        this.TK_hive = TK_hive;
    }

    static getAll() {
        return db.execute('SELECT * FROM hive_weight');
    }

    static getById(id) {
        return db.execute('SELECT * FROM hive_weight WHERE id_hive_weight = ?', [id]);
    }

    insert() {
        return db.execute(
            'INSERT INTO hive_weight (weight, time_weight, TK_hive, TK_hive1) VALUES (?, ?, ?)',
            [this.weight, this.time_weight, this.TK_hive]
        );
    }

    update() {
        return db.execute(
            'UPDATE hive_weight SET weight = ?, time_weight = ?, TK_hive = ? WHERE id_hive_weight = ?',
            [this.weight, this.time_weight, this.TK_hive, this.id_hive_weight]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM hive_weight WHERE id_hive_weight = ?', [id]);
    }

    static delete(weightEntry) {
        return db.execute('DELETE FROM hive_weight WHERE id_hive_weight = ?', [weightEntry.id_hive_weight]);
    }
};