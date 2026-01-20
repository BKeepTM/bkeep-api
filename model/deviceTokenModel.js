import connection from "../util/database.js";

export default class DeviceTokenModel {
    
    static async saveToken(userId, token) {
        return connection.execute(
            "INSERT IGNORE INTO user_device_token (user_id, token) VALUES (?, ?)",
            [userId, token]
        );
    }

    static async getTokensByUserId(userId) {
        const [results] = await connection.execute(
            'SELECT token FROM user_device_token WHERE user_id = ?', 
            [userId]
        );
        return results.map(row => row.token);
    }
    
    static async deleteTokens(tokens) {
        if (tokens.length === 0) return;
        const placeholders = tokens.map(() => '?').join(',');
        return connection.execute(
            `DELETE FROM user_device_token WHERE token IN (${placeholders})`,
            tokens
        );
    }
}