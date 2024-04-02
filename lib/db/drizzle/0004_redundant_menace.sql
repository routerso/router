ALTER TABLE "log" ADD COLUMN "endpointId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "log" ADD CONSTRAINT "log_endpointId_endpoint_id_fk" FOREIGN KEY ("endpointId") REFERENCES "endpoint"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
