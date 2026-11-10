import chalk from "chalk";
import mongoose from "mongoose";
import { NODE_ENV } from "./envConfig.js";

const mongoUriByEnvironment = {
  dev: process.env.MONGODB_URI_DEV,
  stage: process.env.MONGODB_URI_STAGE,
  prod: process.env.MONGODB_URI_PROD,
} as const;

export default async function connectDB(): Promise<void> {
  const mongoUri = mongoUriByEnvironment[NODE_ENV];

  if (!mongoUri) {
    throw new Error(`MONGODB_URI_${NODE_ENV.toUpperCase()} is not configured.`);
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10_000,
  });

  console.info(
    chalk.green(`Connected to MongoDB (${chalk.yellow(NODE_ENV)}).`),
  );
}
