import { createServer } from "node:http";
import chalk from "chalk";
import { NODE_ENV, PORT } from "./shared/config/envConfig.js";
import app from "./app.js";

function main() {
  try {
    const server = createServer(app);

    server.listen(PORT, () => {
      console.log(
        `Server is running on ${chalk.cyan.underline(`http://localhost:${PORT}`)} in ${chalk.yellow(NODE_ENV)} environment`,
      );
    });
  } catch (error) {
    console.error(chalk.red.bold("Server failed to start:"), error);
  }
}

main();
