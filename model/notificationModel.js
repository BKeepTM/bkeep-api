import connection from "../util/database.js";

export default class NotificationMdel {
    constructor(id, summary, description, href,user_id) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.href = href;
        this.user_id = user_id;
    }

    static async getAllByUserId(userId) {
        const [results] = await connection.execute(
            `SELECT notification.* 
             FROM notification
             JOIN user ON user.id = notification.user_id 
             WHERE notification.id_user = ?`,
            [userId]
        );
        return results;
    }
     static async getAll() { // getall metode za admin klice... prosim ne spreminjaj
        try {
            const [results, fields] = await connection.execute(`SELECT * FROM notification`);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    static async notificationBelongsToUser(notificationId, userId) {
        const [results] = await connection.execute(
            `SELECT id FROM notification WHERE id = ? AND id_user = ?`,
            [notificationId, userId]
        );
        return results.length > 0;
    }
    static async getByIdForUser(notificationId, userId) {
        const [results] = await connection.execute(
            `SELECT notification.* 
             FROM notification 
             JOIN user ON no.id_user = user.id 
             WHERE notification.id_user = ? AND user.id_user = ?`,
            [hiveId, userId]
        );
        return results ?? null;
    }
 
    insert() {
        return connection.execute(
            `INSERT INTO notification (summary, description, href, id_user) VALUES (?, ?, ?,?)`,
            [this.summary, this.description, this.href, this.id_user]
        );
    }

    update() {
        return connection.execute(
            `UPDATE notification SET summary = ?, description = ?, href = ?, id_user = ? WHERE id = ?`,
            [this.summary, this.description, this.href, this.id_user, this.id]
        );
    }

    static async deleteByIdForUser(notificationId, userId) {
        return connection.execute(
            `DELETE notification 
             FROM notification 
             WHERE notification.id = ? AND notification.user_id = ?`,
            [notificationId, userId]
        );
    }
}
