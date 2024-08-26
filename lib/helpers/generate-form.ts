/**
 * Generates a Shadcn form based on the provided schema and URL.
 *
 * @param schema - The schema defining the form fields.
 * @param url - The URL to submit the form data to.
 * @returns The generated Shadcn form as a string.
 */
export const generateShadcnForm = (schema: GeneralSchema[]): string => {
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

  const getFieldComponent = (field: GeneralSchema) => {
    if (field.value === "boolean") {
      return `
        <Switch
          className="flex"
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      `;
    } else if (field.value === "date") {
      return `
        <Popover>
          <PopoverTrigger className="flex" asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      `;
    } else {
      return `
        <Input
          placeholder="${field.key}"
          {...field}
          type="${field.value}"
        />
      `;
    }
  };

  const hasBooleanField = schema.some((field) => field.value === "boolean");
  const hasDateField = schema.some((field) => field.value === "date");

  return `"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
${
  hasBooleanField
    ? `
import { Switch } from "@/components/ui/switch";
`
    : ""
}
${
  hasDateField
    ? `
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
`
    : ""
}
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  ${schema.map((field) => `${field.key}: ${getZodType(field)}`).join(",\n  ")}
});

export function RouterForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        ${schema
          .map(
            (field) => `
        <FormField
          control={form.control}
          name="${field.key}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.key}</FormLabel>
              <FormControl>
                ${getFieldComponent(field)}
              </FormControl>
              <FormDescription>
                ${`Enter the ${field.key} for the endpoint.`}
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
}
`;
};
