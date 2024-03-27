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
    name: "zipCode",
  },
];

export const validations: { [key: string]: z.ZodType<any, any> } = {
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
