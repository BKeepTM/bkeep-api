const db = require("../util/database.js");

//tukaj je osnovna struktura tabele Location, in CRUD metode

module.exports = class Location {
    constructor(id_location, longitude, latitude) {
        this.id_location = id_location;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    static getAll() {
        return db.execute('SELECT * FROM location');
    }

    static getById(id) {
        return db.execute('SELECT * FROM location WHERE id_location = ?', [id]);
    }

    insert() {
        return db.execute(
            'INSERT INTO location (longitude, latitude) VALUES (?, ?)',
            [this.longitude, this.latitude]
        );
    }

    update() {
        return db.execute(
            'UPDATE location SET longitude = ?, latitude = ? WHERE id_location = ?',
            [this.longitude, this.latitude, this.id_location]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM location WHERE id_location = ?', [id]);
    }

    static delete(location) {
        return db.execute('DELETE FROM location WHERE id_location = ?', [location.id_location]);
    }
};