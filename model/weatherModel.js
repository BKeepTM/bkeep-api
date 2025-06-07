import connection from "../util/database.js";

export default class WeatherModel {
    constructor(id,report_date,longitude,latitude,temperature,air_pressure,humidity,wind_speed,precipitation) {
    this.id = id;
    this.report_date = report_date;
    this.longitude = longitude;
    this.latitude = latitude;
    this.temperature = temperature;
    this.air_pressure = air_pressure;
    this.humidity = humidity;
    this.wind_speed = wind_speed;
    this.precipitation = precipitation;
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM weather');
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    static async getById(id) {
        try {
            const [results, fields] = await connection.execute('SELECT * FROM weather WHERE id = ?', [id]);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    insert() {
        return connection.execute(
            'INSERT INTO weather (report_date, location_x, location_y	, temperature, air_pressure, humidity, wind_speed, precipitation) VALUES (?, ?,?, ?, ?, ?, ?,?)',
            [this.report_date, this.longitude,this.latitude, this.temperature, this.air_pressure, this.humidity,  this.wind_speed, this.precipitation] 
        );
    }

    update() {
        return connection.execute(
            'UPDATE weather SET report_date = ?, location_x = ?, location_y	 = ?, temperature = ?, air_pressure = ?, humidity = ?, wind_speed = ?, precipitation=? WHERE id = ?',
            [this.report_date, this.longitude,this.latitude, this.temperature, this.air_pressure, this.humidity, this.wind_speed, this.precipitation ,this.id]
        );
    }

    static deleteById(id) {
        return connection.execute('DELETE FROM weather WHERE id = ?', [id]);
    }

    delete() {
        return connection.execute(
          'DELETE FROM weather WHERE id = ? ',
          [this.id]
        );
      }

};