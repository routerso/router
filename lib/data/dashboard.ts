"use server";

import { sql } from "drizzle-orm";
import { db } from "../db";
import { authenticatedAction } from "./safe-action";

/**
 * Get lead and error counts in proper format for shadcn/ui charts
 *
 * Protected by authenticatedAction wrapper
 * example row: { date: "2024-08-01", leads: 7, errors: 2 }
 */
export const getLeadAndErrorCounts = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const data = await db.execute(sql`
    WITH date_series AS (
        SELECT generate_series(
            date_trunc('day', now() - interval '1 month'),
            date_trunc('day', now()),
            '1 day'::interval
        ) AS date
    ),
    user_endpoints AS (
        SELECT "id"
        FROM endpoint
        WHERE "userId" = ${userId}
    ),
    lead_counts AS (
        SELECT
            date_trunc('day', lead."createdAt") AS date,
            COUNT(*)::int AS leads
        FROM
            lead
        INNER JOIN user_endpoints ue ON lead."endpointId" = ue."id"
        WHERE
            lead."createdAt" >= now() - interval '1 month'
        GROUP BY
            date
    ),
    error_counts AS (
        SELECT
            date_trunc('day', log."createdAt") AS date,
            COUNT(*)::int AS errors
        FROM
            log
        INNER JOIN user_endpoints ue ON log."endpointId" = ue."id"
        WHERE
            log."type" = 'error'
            AND log."createdAt" >= now() - interval '1 month'
        GROUP BY
            date
    )
    SELECT
        to_char(ds.date, 'YYYY-MM-DD') AS date,
        COALESCE(lc.leads, 0)::int AS leads,
        COALESCE(ec.errors, 0)::int AS errors
    FROM
        date_series ds
    LEFT JOIN
        lead_counts lc ON ds.date = lc.date
    LEFT JOIN
        error_counts ec ON ds.date = ec.date
    ORDER BY
        ds.date;
    `);

    return data.rows as LeadAndErrorCountResults;
  }
);
