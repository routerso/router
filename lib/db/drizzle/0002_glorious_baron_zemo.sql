ALTER TABLE "endpoint" ADD COLUMN "webhookEnabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "endpoint" ADD COLUMN "webhook" text;