import { z } from "zod";

export const deleteLogSchema = z.object({
  id: z.string(),
});

export const getLeadDataSchema = z.object({
  id: z.string(),
});
