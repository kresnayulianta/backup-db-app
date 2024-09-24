import dotenv from 'dotenv';
import useValidateEnvVar from '../utils/useValidateEnvVar';

dotenv.config();

export interface NotificationConfig {
  slack: {
    webhookUrl: string;
  };
}

export function validateSlackConfig() {
  useValidateEnvVar(notificationConfig.slack.webhookUrl, 'SLACK_WEBHOOK_URL');
}

const notificationConfig: NotificationConfig = {
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL || ''
  }
};

export default notificationConfig;
