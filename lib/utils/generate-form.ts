export const generateShadcnForm = (schema: GeneralSchema[], url: string) => {
  const getZodType = (field: GeneralSchema) => {
    let zodType = "";
    switch (field.value) {
      case "string":
        zodType = "z.string()";
        break;
      case "number":
        zodType = "z.number()";
        break;
      case "date":
        zodType = "z.date()";
        break;
      case "boolean":
        zodType = "z.boolean()";
        break;
      case "email":
        zodType = "z.string().email()";
        break;
      case "url":
        zodType = "z.string().url()";
        break;
      case "phone":
        zodType = "z.string().regex(/^\\+?[1-9]\\d{1,14}$/)";
        break;
      case "zip_code":
        zodType = "z.string().regex(/^\\d{5}(?:[-\\s]\\d{4})?$/)";
        break;
      default:
        zodType = "z.string()";
    }
    if (field.required) {
      zodType += ".min(1, { message: 'This field is required' })";
    }
    return zodType;
  };

  const getInputType = (fieldType: ValidationType) => {
    switch (fieldType) {
      case "number":
        return "number";
      case "date":
        return "date";
      case "email":
        return "email";
      case "url":
        return "url";
      default:
        return "text";
    }
  };

  const getFieldComponent = (field: GeneralSchema) => {
    if (field.value === "boolean") {
      return `
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      `;
    } else {
      return `
        <Input
          placeholder="Enter ${field.key}"
          {...field}
          type="${getInputType(field.value)}"
        />
      `;
    }
  };

  const hasBooleanField = schema.some((field) => field.value === "boolean");

  return `"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
${
  hasBooleanField
    ? `
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
`
    : ""
}
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  ${schema.map((field) => `${field.key}: ${getZodType(field)}`).join(",\n  ")}
});

type FormData = z.infer<typeof schema>;

export const RouterForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form action="${url}" method="POST">
        ${schema
          .map(
            (field) => `
              <FormField
                control={form.control}
                name="${field.key}"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>${field.label || field.key}</FormLabel>
                    <FormControl>
                      ${getFieldComponent(field)}
                    </FormControl>
                    <FormDescription>
                      ${
                        field.description ||
                        `Enter the ${field.key} for the endpoint.`
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            `
          )
          .join("")}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};  `;
};
