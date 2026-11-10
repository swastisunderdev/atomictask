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

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

function getJwtSecret(name: string): string {
  const secret = getRequiredEnv(name);
  if (Buffer.byteLength(secret, "utf8") < 32 || /your[_ -].*secret/i.test(secret)) {
    throw new Error(`${name} must be a non-placeholder secret of at least 32 bytes.`);
  }
  return secret;
}

function getTokenExpiration(name: string): string {
  const expiration = getRequiredEnv(name);
  if (!/^[1-9]\d*\s*[smhd]$/.test(expiration)) {
    throw new Error(`${name} must be a positive duration such as 15m, 1h, or 7d.`);
  }
  return expiration;
}

function getBcryptSaltRounds(): number {
  const rawRounds = getRequiredEnv("BCRYPT_SALT_ROUNDS");
  const rounds = Number(rawRounds);
  if (!Number.isInteger(rounds) || rounds < 10 || rounds > 15) {
    throw new Error("BCRYPT_SALT_ROUNDS must be an integer between 10 and 15.");
  }
  return rounds;
}

export const PORT = process.env.PORT ?? 8080;
export const NODE_ENV = getNodeEnvironment();
export const BCRYPT_SALT_ROUNDS = getBcryptSaltRounds();
export const JWT_ACCESS_EXPIRE = getTokenExpiration("JWT_ACCESS_EXPIRE");
export const JWT_ACCESS_SECRET = getJwtSecret("JWT_ACCESS_SECRET");
export const JWT_REFRESH_EXPIRE = getTokenExpiration("JWT_REFRESH_EXPIRE");
export const JWT_REFRESH_SECRET = getJwtSecret("JWT_REFRESH_SECRET");

if (JWT_ACCESS_SECRET === JWT_REFRESH_SECRET) {
  throw new Error("JWT access and refresh secrets must be different.");
}

export const CORS_ORIGINS = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
