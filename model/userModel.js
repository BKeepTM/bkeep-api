import connection from "../util/database.js";

//tukaj je osnovna struktura tabele user, in CRUD metode

export default class User {
    constructor(id, username, password, mail, settings) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.settings = settings;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM user');
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    
    static async getByUsername(username){
        try {
            const [results, fields] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    static async getById(id) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO user (username, password, mail, settings) VALUES (?, ?, ?, ?)',
            [this.username, this.password, this.mail, JSON.stringify(this.settings)]
        );
    }

    update() {
        return connection.execute(
            'UPDATE user SET username = ?, password = ?, mail = ?, settings = ? WHERE id = ?',
            [this.username, this.password, this.mail, JSON.stringify(this.settings), this.id]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM user WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute('DELETE FROM user WHERE username = ? AND mail = ?', 
            [this.username, this.mail]);
    }
};