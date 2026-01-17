import connection from "../util/database.js";

//tukaj je osnovna struktura tabele deviceData, in CRUD metode

export default class deviceDataModel {
    constructor(id_device_data,humidity, brightness, temperature, longitude, latitude , time,id_user) {
        this.id_device_data = id_device_data;
        this.humidity = humidity;
        this.brightness = brightness;
        this.temperature = temperature;
        this.longitude = longitude;
        this.latitude = latitude;
        this.time = time;
        this.id_user = id_user;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute(`SELECT * FROM device_data`);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
     static async getAllByUserId(userId) {
        try {
            const [results, fields] = await connection.execute(`
                SELECT * FROM device_data WHERE user_id = ?`, [userId]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    static async getById(userId,id) {
        try {
            const [results, fields] = await connection.execute(
                `SELECT * FROM device_data 
                WHERE user_id = ? AND id = ?`, [userId, id]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO device_data (humidity, brightness, temperature, longitude, latitude , time, user_id) VALUES (?, ?, ?, ?, ? , ?, ?)',
            [this.humidity,this.brightness,this.temperature,this.longitude,this.latitude, this.time, this.id_user]
        );
    }

    update() {
        return connection.execute(
            'UPDATE device_data SET humidity = ? , brightness = ?, temperature = ?, longitude = ?, latitude = ?, time = ?, user_id = ? WHERE id = ?',
            [this.humidity, this.brightness, this.temperature, this.longitude, this.latitude, this.time, this.id_user, this.id_device_data]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM device_data WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute('DELETE FROM device_data WHERE humidity = ? AND time = ? AND id_user = ?', 
            [this.humidity, this.time, this.id_user]);
    }

    static async getAllByDate(date) {
        try {
            const [results] = await connection.execute(
                `SELECT * FROM device_data WHERE DATE(time) = ?`,
                [date] // npr. '2025-09-30'
            );
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
};