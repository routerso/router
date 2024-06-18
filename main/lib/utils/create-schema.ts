import { z } from "zod";
import { validations } from "./validations";

/**
 *
 * @param schema
 * @param validations
 * @returns
 */

export const createDynamicSchema = (
  schema: Array<GeneralSchema>
): z.ZodRawShape => {
  return schema.reduce<z.ZodRawShape>((acc, { key, value }) => {
    const validation = validations[value];
    if (validation) {
      acc[key as keyof SchemaToZodMap] = validation;
    }
    return acc;
  }, {});
};
