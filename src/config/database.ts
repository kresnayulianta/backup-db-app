import dotenv from 'dotenv';
import useValidateEnvVar from '../utils/useValidateEnvVar';

dotenv.config();

interface DatabaseEntry {
  database: string;
  user: string;
  password: string;
  host: string;
  port: string;
}

interface DatabaseConfig {
  postgres: DatabaseEntry[];
  mysql: DatabaseEntry[];
}

function expandConfig(dbNames: string[], users: string[], passwords: string[], hosts: string[], port: string[]): DatabaseEntry[] {
  return dbNames.map((dbName, index) => ({
    database: dbName,
    user: users[index] || users[users.length - 1],
    password: passwords[index] || passwords[passwords.length - 1],
    host: hosts[index] || hosts[hosts.length - 1],
    port: port[index] || port[port.length - 1],
  }));
}

const postgresDbs = (process.env.PG_DATABASES || '').split(',');
const postgresUsers = (process.env.PG_USERS || '').split(',');
const postgresPasswords = (process.env.PG_PASSWORDS || '').split(',');
const postgresHosts = (process.env.PG_HOSTS || '').split(',');
const postgresPorts = (process.env.PG_PORTS || '').split(',');

const mysqlDbs = (process.env.MYSQL_DATABASES || '').split(',');
const mysqlUsers = (process.env.MYSQL_USERS || '').split(',');
const mysqlPasswords = (process.env.MYSQL_PASSWORDS || '').split(',');
const mysqlHosts = (process.env.MYSQL_HOSTS || '').split(',');
const mysqlPorts = (process.env.MYSQL_PORTS || '').split(',');

// Expand configuration to ensure all databases have a corresponding user, password, and host
const databaseConfig: DatabaseConfig = {
  postgres: expandConfig(postgresDbs, postgresUsers, postgresPasswords, postgresHosts, postgresPorts),
  mysql: expandConfig(mysqlDbs, mysqlUsers, mysqlPasswords, mysqlHosts, mysqlPorts),
};

// Validate environment variables
export function validatePostgresConfig() {
  useValidateEnvVar(postgresDbs, 'PostgreSQL databases');
  useValidateEnvVar(postgresUsers, 'PostgreSQL users');
  useValidateEnvVar(postgresPasswords, 'PostgreSQL passwords');
  useValidateEnvVar(postgresHosts, 'PostgreSQL hosts');
  useValidateEnvVar(postgresPorts, 'PostgreSQL ports');
}

export function validateMysqlConfig() {
  useValidateEnvVar(mysqlDbs, 'MySQL databases');
  useValidateEnvVar(mysqlUsers, 'MySQL users');
  useValidateEnvVar(mysqlPasswords, 'MySQL passwords');
  useValidateEnvVar(mysqlHosts, 'MySQL hosts');
  useValidateEnvVar(mysqlPorts, 'MySQL ports');
}

export default databaseConfig;
