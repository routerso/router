DO $$ BEGIN
 CREATE TYPE "public"."plan" AS ENUM('free', 'lite', 'pro', 'business', 'enterprise');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan" "plan" DEFAULT 'free' NOT NULL;