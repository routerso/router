import * as z from "zod";
import validator from "validator";

export const validationOptions: { name: ValidationType }[] = [
  {
    name: "phone",
  },
  {
    name: "email",
  },
  {
    name: "string",
  },
  {
    name: "number",
  },
  {
    name: "date",
  },
  {
    name: "boolean",
  },
  {
    name: "url",
  },
  {
    name: "zip_code",
  },
];

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

// TODO: add comments
export const convertToCorrectTypes = (data: any, schema: GeneralSchema[]) => {
  const result: any = {};

  schema.forEach(({ key, value }) => {
    if (value === "boolean") {
      // Convert "true" and "false" strings to boolean values
      result[key] = data[key] === "true";
    } else if (value === "number") {
      // Convert string to number, ensuring NaN is handled appropriately
      const num = Number(data[key]);
      result[key] = isNaN(num) ? undefined : num;
    } else {
      // For all other types, assume string or no conversion needed
      result[key] = data[key];
    }
  });

  return result;
};

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
