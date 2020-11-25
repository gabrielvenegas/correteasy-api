import { env } from "../env";

export default {
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password,
};
