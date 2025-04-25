const db = require("../util/database.js");

//tukaj je osnovna struktura tabele Notes, in CRUD metode

module.exports = class Notes {
    constructor(id_notes, content, time) {
        this.id_notes = id_notes;
        this.content = content;
        this.time = time;
    }

    static getAll() {
        return db.execute('SELECT * FROM notes');
    }

    static getById(id) {
        return db.execute('SELECT * FROM notes WHERE id_notes = ?', [id]);
    }

    insert() {
        return db.execute(
            'INSERT INTO notes (content, time) VALUES (?, ?)',
            [this.content, this.time]
        );
    }

    update() {
        return db.execute(
            'UPDATE notes SET content = ?, time = ? WHERE id_notes = ?',
            [this.content, this.time, this.id_notes]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM notes WHERE id_notes = ?', [id]);
    }

    static delete(note) {
        return db.execute('DELETE FROM notes WHERE id_notes = ?', [note.id_notes]);
    }
};