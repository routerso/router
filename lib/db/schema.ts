import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  varchar,
  pgEnum,
  boolean,
  numeric,
  json,
  serial,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
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
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
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
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  incrementId: serial("incrementId").notNull().unique(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  schema: json("schema").notNull(),
  enabled: boolean("enabled").default(true).notNull(),
  webhookEnabled: boolean("webhookEnabled").default(false).notNull(),
  webhook: text("webhook"),
  formEnabled: boolean("formEnabled").default(false).notNull(),
  successUrl: text("successUrl").notNull(),
  failUrl: text("failUrl"),
  token: text("token"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const leads = pgTable("lead", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  endpointId: uuid("endpointId")
    .notNull()
    .references(() => endpoints.id, { onDelete: "cascade" }),
  data: json("data").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const logTypeEnum = pgEnum("logType", ["success", "error"]);

export const logs = pgTable("log", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  endpointId: uuid("endpointId")
    .notNull()
    .references(() => endpoints.id, { onDelete: "cascade" }),
  type: logTypeEnum("type").notNull(),
  message: json("message").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});
