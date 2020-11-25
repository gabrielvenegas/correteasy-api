import nodemailer from "nodemailer";
import { env } from "../../env";

export default nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.password,
  },
});
