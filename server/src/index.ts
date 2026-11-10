import { createServer } from "node:http";
import chalk from "chalk";
import { NODE_ENV, PORT } from "./shared/config/envConfig.js";
import connectDB from "./shared/config/dbConfig.js";
import app from "./app.js";

async function main(): Promise<void> {
  try {
    await connectDB();

    const server = createServer(app);

    server.on("error", (error) => {
      console.error(chalk.red.bold("Server failed:"), error);
      process.exitCode = 1;
    });

    server.listen(PORT, () => {
      console.log(
        `Server is running on ${chalk.cyan.underline(`http://localhost:${PORT}`)} in ${chalk.yellow(NODE_ENV)} environment`,
      );
    });
  } catch (error) {
    console.error(chalk.red.bold("Server failed to start:"), error);
    process.exitCode = 1;
  }
}

void main();
