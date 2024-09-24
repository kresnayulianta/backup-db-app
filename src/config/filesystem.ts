import dotenv from 'dotenv';
import useValidateEnvVar from '../utils/useValidateEnvVar';

dotenv.config();

// Interface for environment variables
interface R2Config {
  accessKeyId: string;
  secretAccessKey: string;
  defaultRegion: string;
  bucket: string;
  usePathStyleEndpoint: boolean;
  endpoint: string;
  url: string;
}

interface FileSystemConfig {
  cloudflareR2: R2Config,
  backupPath: {
    local: string;
    r2: string;
  }
}

const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || '';
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '';
const r2DefaultRegion = process.env.R2_DEFAULT_REGION || '';
const r2Bucket = process.env.R2_BUCKET || '';
const r2UsePathStyleEndpoint = process.env.R2_USE_PATH_STYLE_ENDPOINT === 'true';
const r2Endpoint = process.env.R2_ENDPOINT || '';
const r2Url = process.env.R2_URL || '';

const fileSystemConfig: FileSystemConfig = {
  cloudflareR2: {
    accessKeyId: r2AccessKeyId,
    secretAccessKey: r2SecretAccessKey,
    defaultRegion: r2DefaultRegion,
    bucket: r2Bucket,
    usePathStyleEndpoint: r2UsePathStyleEndpoint,
    endpoint: r2Endpoint,
    url: r2Url
  },
  backupPath: {
    local: process.env.BACKUP_PATH_LOCAL || '',
    r2: process.env.BACKUP_PATH_R2 || ''
  }
};

export function validateR2Config() {
  useValidateEnvVar(r2AccessKeyId, 'R2_ACCESS_KEY_ID');
  useValidateEnvVar(r2SecretAccessKey, 'R2_SECRET_ACCESS_KEY');
  useValidateEnvVar(r2DefaultRegion, 'R2_DEFAULT_REGION');
  useValidateEnvVar(r2Bucket, 'R2_BUCKET');
  useValidateEnvVar(`${r2UsePathStyleEndpoint}`, 'R2_USE_PATH_STYLE_ENDPOINT');
  useValidateEnvVar(r2Endpoint, 'R2_ENDPOINT');
  useValidateEnvVar(r2Url, 'R2_URL');
}

export default fileSystemConfig;
