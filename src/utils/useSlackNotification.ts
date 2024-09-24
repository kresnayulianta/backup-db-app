import axios from 'axios';
import notificationConfig from '../config/notification';

async function useSlackNotification(message: string) {
    try {
        const instance = axios.create({
            decompress: false, // Disable automatic decompression
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Use this instance to make your requests
        await instance.post(
            notificationConfig.slack.webhookUrl,
            {
                text: message
            },
        );
    } catch (error) {
        throw new Error(`Failed to send notification to Slack: ${error}`);
    }
}

export default useSlackNotification;
