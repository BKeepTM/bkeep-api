const db = require("../util/database.js")

//tukaj je osnovna struktura tabele Hive, in CRUD metode

module.exports = class Hive {
    constructor(id,name,location,type,status,fk_location,fk_notes){
    this.id = id;
    this.name = name;
    this.location = location;
    this.type = type;
    this.status = status;
    this.fk_location = fk_location;
    this.fk_notes = fk_notes;
    }
    
    static getAll(){
        return db.execute('SELECT * FROM hive')
    }

    static getById(id) {
        return db.execute('SELECT * FROM hive WHERE id = ?', [id]);
    }

    insert() {
        return db.execute(
            'INSERT INTO hive (id, name, location, type, status, fk_location, fk_notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.id, this.name, this.location, this.type, this.status, this.fk_location, this.fk_notes]
        );
    }

    update() {
        return db.execute(
            'UPDATE hive SET name = ?, location = ?, type = ?, status = ?, fk_location = ?, fk_notes = ? WHERE id_hive = ?',
            [this.name, this.location, this.type, this.status, this.fk_location, this.fk_notes, this.id_hive]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM hive WHERE id = ?', [id]);
    }

    static delete (hive) {
        return db.execute('DELETE FROM hive WHERE id = ?', [hive.id]);
    }
};