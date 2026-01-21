import mqtt from 'mqtt';
import HiveWeightController from '../controller/hiveWeightController.js';

import dotenv from 'dotenv'
dotenv.config();

// Configuration
const HOST = process.env.MQTT_HOST;
const PORT = process.env.MQTT_PORT; // HiveMQ Cloud requires 8883 (SSL)
const PROTOCOL = 'mqtts'; // Note the 's' for Secure

// CREDENTIALS - Replace these with what you created in HiveMQ Console
const USERNAME = process.env.MQTT_USERNAME; 
const PASSWORD = process.env.MQTT_PASSWORD;

const TOPIC_HIVE_UPLOAD = 'hives/upload';

export const initMqtt = () => {
    
    const connectUrl = `${PROTOCOL}://${HOST}:${PORT}`;
    
    const client = mqtt.connect(connectUrl, {
        username: USERNAME,
        password: PASSWORD,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
        // Node.js generally trusts standard CAs, but if you have SSL issues:
        // rejectUnauthorized: true, 
    });

    client.on('connect', () => {
        console.log('Connected to HiveMQ Cloud');
        
        // Subscribe to the topic
        client.subscribe([TOPIC_HIVE_UPLOAD], () => {
            console.log(`Subscribed to topic: '${TOPIC_HIVE_UPLOAD}'`);
        });
    });

    client.on('message', async (topic, payload) => {
        if (topic === TOPIC_HIVE_UPLOAD) {
            console.log(' Message received on:', topic);
            // Pass the buffer directly to your Controller
            await HiveWeightController.handleMqttMessage(topic, payload);
        }
    });

    client.on('error', (error) => {
        console.error('MQTT Connection Error:', error);
    });
};