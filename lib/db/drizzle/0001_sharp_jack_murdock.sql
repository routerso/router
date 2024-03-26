DO $$ BEGIN
 CREATE TYPE "logType" AS ENUM('success', 'error');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "endpoint" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"incrementId" serial NOT NULL,
	"userId" uuid NOT NULL,
	"name" text NOT NULL,
	"schema" json NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "endpoint_incrementId_unique" UNIQUE("incrementId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lead" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"endpointId" uuid NOT NULL,
	"data" json NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "logType" NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "endpoint" ADD CONSTRAINT "endpoint_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lead" ADD CONSTRAINT "lead_endpointId_endpoint_id_fk" FOREIGN KEY ("endpointId") REFERENCES "endpoint"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
