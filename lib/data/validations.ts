import { z } from "zod";

export const deleteLogSchema = z.object({
  id: z.string(),
});
