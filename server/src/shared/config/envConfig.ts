import "dotenv/config";

const supportedEnvironments = ["dev", "stage", "prod"] as const;
type Environment = (typeof supportedEnvironments)[number];

function getNodeEnvironment(): Environment {
  const environment = process.env.NODE_ENV ?? "dev";

  switch (environment) {
    case "dev":
    case "stage":
    case "prod":
      return environment;
    default:
      throw new Error(
        `Invalid NODE_ENV "${environment}". Expected one of: ${supportedEnvironments.join(", ")}.`,
      );
  }
}

export const PORT = process.env.PORT ?? 8080;
export const NODE_ENV = getNodeEnvironment();
export const CORS_ORIGINS = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
