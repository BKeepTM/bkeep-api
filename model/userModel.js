const db = require("../util/database.js");

//tukaj je osnovna struktura tabele user, in CRUD metode

module.exports = class User {
    constructor(id_user, username, password, mail, settings, TK_hive) {
        this.id_user = id_user;
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.settings = settings;
        this.TK_hive = TK_hive;
    }

    static getAll() {
        return db.execute('SELECT * FROM user');
    }

    static getById(id) {
        return db.execute('SELECT * FROM user WHERE id_user = ?', [id]);
    }

    insert() {
        return db.execute(
            'INSERT INTO user (username, password, mail, settings, TK_hive) VALUES (?, ?, ?, ?, ?)',
            [this.username, this.password, this.mail, JSON.stringify(this.settings), this.TK_hive]
        );
    }

    update() {
        return db.execute(
            'UPDATE user SET username = ?, password = ?, mail = ?, settings = ?, TK_hive = ? WHERE id_user = ?',
            [this.username, this.password, this.mail, JSON.stringify(this.settings), this.TK_hive, this.id_user]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM user WHERE id_user = ?', [id]);
    }

    static delete(user) {
        return db.execute('DELETE FROM user WHERE id_user = ?', [user.id_user]);
    }
};