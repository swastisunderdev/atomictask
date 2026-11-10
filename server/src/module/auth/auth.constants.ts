export enum AccountStatus {
  ACTIVE = "active",
  PENDING_VERIFICATION = "pending_verification",
  SUSPENDED = "suspended",
  DISABLED = "disabled",
}

export enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
}

export const EMAIL_VERIFY_EXPIRE_MS = 24 * 60 * 60 * 1_000;
export const LOCK_TIME_MS = 15 * 60 * 1_000;
export const MAX_LOGIN_ATTEMPTS = 5;
export const MAX_REFRESH_SESSIONS = 5;
export const PASSWORD_RESET_EXPIRE_MS = 60 * 60 * 1_000;

export enum SubscriptionStatus {
  NONE = "none",
  ACTIVE = "active",
  CANCELED = "canceled",
  PAST_DUE = "past_due",
  EXPIRED = "expired",
}

export enum SubscriptionTier {
  FREE = "free",
  PRO = "pro",
  PREMIUM = "premium",
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
