import express, {
  type Application,
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { CORS_ORIGINS, NODE_ENV } from "./shared/config/envConfig.js";

const app: Application = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: CORS_ORIGINS.length > 0 ? CORS_ORIGINS : false }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(morgan(NODE_ENV === "prod" ? "combined" : "dev"));

const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
};

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status =
    typeof error === "object" && error !== null && "status" in error
      ? error.status
      : undefined;
  const statusCode =
    typeof status === "number" && status >= 400 && status < 600 ? status : 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  const message =
    statusCode >= 500
      ? "Internal server error"
      : error instanceof Error
        ? error.message
        : "Request failed";

  res.status(statusCode).json({ success: false, message });
};

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
