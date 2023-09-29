import dotenv = require("dotenv");
import path = require("path");

// Specify the path to the .env file
const envPath = path.resolve(__dirname, "../../../.env");

// Load environment variables from the .env file
dotenv.config({ path: envPath });

export default {
  testing: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "src/seeds",
    },
    pool: {
      min: 2,
      max: 10, // Increase the max pool size as needed
    },
  },
  development: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "src/seeds",
    },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "src/seeds",
    },
  },
};
