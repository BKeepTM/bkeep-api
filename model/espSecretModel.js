import connection from "../util/database.js";
/*
    razred za registracijo esp-jev v bazo. ob registraciji se v bazo doda secret za HMAC, ki ga bo esp uporabljal za posiljanje podatkov.
 
*/
export default class EspSecretModel {
    constructor(id, secret, id_hive, date_registered) {
        this.id = id;
        this.secret = secret;
        this.id_hive = id_hive;
        this.date_registered = date_registered;
    }
    static async getById(espSecretId) {
        const [results] = await connection.execute(
            `SELECT * 
             FROM esp_secret 
             WHERE id = ?`,
            [espSecretId]
        );
        return results;
    }
    static async getBySecret(espSecret) {
        const [results] = await connection.execute(
            `SELECT * 
             FROM esp_secret 
             WHERE secret = ?`,
            [espSecret]
        );
        return results;
    }
    static async getByHiveId(hiveId) {
        const [results] = await connection.execute(
            `SELECT * 
             FROM esp_secret 
             WHERE id_hive = ?`,
            [hiveId]
        );
        return results;
    }
     static async getAll() { // getall metode za admin klice... prosim ne spreminjaj
        try {
            const [results, fields] = await connection.execute(`SELECT * FROM esp_secret`);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    static async getAllByUserId(userId) { // pridobi glede na uporabnika
         try {
            const [results, fields] = await connection.execute(
                `SELECT esp_secret.*
                 FROM esp_secret es, hive h
                 WHERE es.id_hive = h.id AND h.id_user = ?`,
                [userId]
            );
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    insert() {
        return connection.execute(
            `INSERT INTO esp_secret (secret, id_hive, date_registered) VALUES (?, ?, ?)`,
            [this.secret, this.id_hive, this.date_registered]
        );
    }

    update() {
        return connection.execute(
            `UPDATE esp_secret SET secret = ?, id_hive = ? WHERE id = ?`,
            [this.secret, this.id_hive, this.id]
        );
    }

    static async deleteByIdForUser(espSecretId, userId) { // uporabnik odstrani svoj esp :)
        return connection.execute(
            `DELETE esp_secret 
             FROM esp_secret 
             JOIN hive ON esp_secret.id_hive = hive.id 
             WHERE esp_secret.id = ? AND hive.id_user = ?`,
            [espSecretId, userId]
        );
    }

    static async deleteAdmin(espSecretId) { // admin 
        return connection.execute('DELETE FROM esp_secret WHERE id = ?', [espSecretId]);
    }
}
