import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { init } from "@paralleldrive/cuid2";

const createId = init({
  length: 8,
});

export const users = pgTable("user", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("session_token").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const endpoints = pgTable("endpoint", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  schema: jsonb("schema")
    .$type<{ key: string; value: ValidationType }[]>()
    .notNull(),
  enabled: boolean("enabled").default(true).notNull(),
  webhookEnabled: boolean("webhook_enabled").default(false).notNull(),
  emailNotify: boolean("email_notify").default(false).notNull(),
  webhook: text("webhook"),
  formEnabled: boolean("form_enabled").default(false).notNull(),
  successUrl: text("success_url"),
  failUrl: text("fail_url"),
  token: text("token"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
});

export const leads = pgTable("lead", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  endpointId: text("endpoint_id")
    .notNull()
    .references(() => endpoints.id, { onDelete: "cascade" }),
  data: jsonb("data").$type<{ [key: string]: any }>().notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
});

export const logTypeEnum = pgEnum("log_type", ["success", "error"]);
export const logPostTypeEnum = pgEnum("log_post_type", ["http", "form"]);

export const logs = pgTable("log", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  endpointId: text("endpoint_id")
    .notNull()
    .references(() => endpoints.id, { onDelete: "cascade" }),
  type: logTypeEnum("type").notNull(),
  postType: logPostTypeEnum("post_type").notNull(),
  message: jsonb("message").$type<Record<string, any> | unknown>().notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
});
