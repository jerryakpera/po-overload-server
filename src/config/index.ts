import dotenv from 'dotenv-safe';

dotenv.config();

const { PORT, BASE_URL, SERVICE_NAME, DB_CONN_STR } = process.env;

const config = {
  port: PORT,
  baseURL: BASE_URL,
  dbConnStr: DB_CONN_STR,
  serviceName: SERVICE_NAME,
};

export default config;
