import connection from "../util/database.js";

export default class blockchainModel {
    constructor(index,previousHash,timestamp,data,difficulty,token,hash){
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.difficulty = difficulty;
    this.token = token;
    this.hash = hash;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM blockchain');
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO blockchain (`index`, previousHash, `timestamp`, `data`, difficulty, token, hash) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.index, this.previousHash, this.timestamp, this.data, this.difficulty,  this.token, this.hash]
        );
    }

    delete() {
        return connection.execute(
          'DELETE FROM blockchain WHERE `index` = ?',
          [this.index]
        );
      }
};