ALTER TABLE "endpoint" ALTER COLUMN "failUrl" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "endpoint" ALTER COLUMN "token" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "endpoint" ADD COLUMN "formEnabled" boolean DEFAULT false NOT NULL;