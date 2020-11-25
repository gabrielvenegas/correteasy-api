import "reflect-metadata";
import { bootstrapMicroframework } from "microframework";
import { expressLoader } from "./loaders/express";
import { swaggerLoader } from "./loaders/swagger";
import { typeormLoader } from "./loaders/typeorm";

bootstrapMicroframework({
  loaders: [expressLoader, typeormLoader, swaggerLoader],
});
