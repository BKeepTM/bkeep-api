import connection from "../util/database.js";

export default class DeviceTokenModel {
    
    // Save a token (called when Android app logs in)
    static async saveToken(userId, token) {
        // IGNORE ensures we don't crash if the token already exists for this user
        return connection.execute(
            'INSERT IGNORE INTO user_device_token (user_id, token) VALUES (?, ?)',
            [userId, token]
        );
    }

    // Get all tokens for a specific user (called when sending push)
    static async getTokensByUserId(userId) {
        const [results] = await connection.execute(
            'SELECT token FROM user_device_token WHERE user_id = ?', 
            [userId]
        );
        return results.map(row => row.token);
    }

    // Remove invalid tokens (called if Firebase says a token is dead)
    static async deleteTokens(tokens) {
        if (tokens.length === 0) return;
        // Create a placeholder string like "?, ?, ?"
        const placeholders = tokens.map(() => '?').join(',');
        return connection.execute(
            `DELETE FROM user_device_token WHERE token IN (${placeholders})`,
            tokens
        );
    }
}