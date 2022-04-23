import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

console.log({user: config.username, pass: config.password, db: config.database, host: config.host, port: config.port})
export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port,

  dialect: "postgres",
  storage: ":memory:",
});