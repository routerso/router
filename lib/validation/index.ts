import * as z from "zod";
import validator from "validator";

/**
 * The validation types that are available
 *
 * These can be extended to have other validation types
 * Steps to add other validation options:
 * 1. add a key value pair in 'validationOptions' of the new validation type
 * 2. Add a zod schema definition in the 'validations' object in this file
 * 3. If necessary, add respective logic to correct / cast the type in the 'convertToCorrectTypes' function
 */
export const validationOptions: { name: ValidationType }[] = [
  { name: "phone" },
  { name: "email" },
  { name: "string" },
  { name: "number" },
  { name: "date" },
  { name: "boolean" },
  { name: "url" },
  { name: "zip_code" },
];

/**
 * Zod validations for each validation type
 *
 * As mentioned above, this can be extended to add further validation types
 */
export const validations: { [key in ValidationType]: z.ZodType<any, any> } = {
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Not a valid phone number.",
  }),
  email: z.string().email("Not a valid email."),
  string: z.string().min(2, "Not a valid string."),
  number: z.number().min(0, "Not a valid number."),
  date: z.date().min(new Date(), "Not a valid date."),
  boolean: z.boolean(),
  url: z.string().url("Not a valid URL."),
  zip_code: z
    .string()
    .min(5, "Not a valid zip code.")
    .max(5, "Not a valid zip code."),
};

/**
 * Converts the data object to the correct types based on the provided schema.
 *
 * @param data - The data object to be converted.
 * @param schema - The schema defining the expected types for each property.
 * @returns The converted data object with correct types.
 */
export const convertToCorrectTypes = (
  data: any,
  schema: GeneralSchema[]
): Record<string, any> => {
  const result: Record<string, any> = {};

  schema.forEach((item: { [key: string]: ValidationType }) => {
    for (const key in item) {
      const value: ValidationType = item[key];
      if (value === "boolean") {
        result[key] = data[key] === "true";
      } else if (value === "number") {
        const num: number = Number(data[key]);
        result[key] = isNaN(num) ? undefined : num;
      } else {
        result[key] = data[key];
      }
    }
  });

  return result;
};

/**
 * Generates a dynamic schema based on the provided schema array.
 *
 * @param schema - An array of GeneralSchema objects representing the schema.
 * @returns A ZodRawShape object representing the generated dynamic schema.
 */
export const generateDynamicSchema = (
  schema: GeneralSchema[]
): z.ZodRawShape => {
  return schema.reduce<z.ZodRawShape>((acc, { key, value }) => {
    const validation = validations[value];
    if (validation) {
      acc[key as keyof SchemaToZodMap] = validation;
    }
    return acc;
  }, {});
};

/**
 * Validates and parses the given data using the provided dynamic schema.
 *
 * @param dynamicSchema - The dynamic schema used for validation.
 * @param data - The data to be validated and parsed.
 * @returns The result of the validation and parsing operation.
 */
export const validateAndParseData = (
  dynamicSchema: z.ZodRawShape,
  data: any
): z.SafeParseReturnType<
  {
    [x: string]: any;
  },
  {
    [x: string]: any;
  }
> => {
  const EndpointZodSchema = z.object(dynamicSchema);

  Object.keys(dynamicSchema).forEach((key) => {
    const validation = dynamicSchema[key];
    console.log(`Field: ${key}, Validation: ${validation._def.typeName}`);
  });

  return EndpointZodSchema.safeParse(data);
};
