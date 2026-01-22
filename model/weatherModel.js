import connection from "../util/database.js";

export default class WeatherModel {
    constructor(
        id,
        report_date,
        location,
        id_location,
        temperature,
        air_pressure,
        humidity,
        wind_speed,
        precipitation
    ) {
        this.id = id;
        this.report_date = report_date;
        this.location = location;
        this.id_location = id_location;
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
      const params = [
        this.report_date,
        this.location,
        this.id_location,
        this.temperature,
        this.air_pressure,
        this.humidity,
        this.wind_speed,
        this.precipitation
      ];

      console.log("WEATHER INSERT PARAMS:", params);
      console.log("UNDEFINED INDEXES:", params
        .map((v, i) => (v === undefined ? i : null))
        .filter(v => v !== null)
      );

      return connection.execute(
        `INSERT INTO weather
         (report_date, location, id_location, temperature, air_pressure, humidity, wind_speed, precipitation)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        params
      );
    }

    update() {
        return connection.execute(
            `UPDATE weather
     SET report_date = ?,
         id_location = ?,
         temperature = ?,
         air_pressure = ?,
         humidity = ?,
         wind_speed = ?,
         precipitation = ?
     WHERE id = ?`,
            [
                this.report_date,
                this.id_location,
                this.temperature,
                this.air_pressure,
                this.humidity,
                this.wind_speed,
                this.precipitation,
                this.id
            ]
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

    async insertOrUpdate() {
        const [result] = await connection.execute(
            `INSERT INTO weather
     (report_date, location, id_location, temperature, air_pressure, humidity, wind_speed, precipitation)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       temperature = VALUES(temperature),
       air_pressure = VALUES(air_pressure),
       humidity = VALUES(humidity),
       wind_speed = VALUES(wind_speed),
       precipitation = VALUES(precipitation)`,
            [
                this.report_date,
                this.location,
                this.id_location,
                this.temperature,
                this.air_pressure,
                this.humidity,
                this.wind_speed,
                this.precipitation
            ]
        );

        return result;
    }

    static async getAllLatestPerLocation() {
        try {
            const [results] = await connection.execute(`
      SELECT *
      FROM (
        SELECT w.*,
               ROW_NUMBER() OVER (PARTITION BY w.id_location ORDER BY w.report_date DESC, w.id DESC) AS rn
        FROM weather w
      ) t
      WHERE t.rn = 1
      ORDER BY t.id_location;
    `);
            return results;
        } catch (err) {
            console.error("Error executing query:", err);
            throw err;
        }
    }

};