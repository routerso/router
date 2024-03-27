"use client";

import * as React from "react";

// type imports
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";

import { validationOptions } from "@/lib/utils/validations";

// next imports
import Link from "next/link";
import { useRouter } from "next/navigation";

// UI Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Not a valid name.").nonempty(),
  schema: z
    .array(
      z.object({
        key: z.string().min(1, { message: "Please enter a valid field name." }),
        value: z.string().min(1, { message: "Please select a field type." }),
      })
    )
    .min(1, { message: "Please enter at least one keyword" }),
  webhookEnabled: z.boolean(),
  webhook: z.string().url().optional(),
});

type DomainValues = z.infer<typeof formSchema>;

const defaultValues: Partial<DomainValues> = {
  name: "",
  schema: [{ key: "", value: "" }],
  webhookEnabled: false,
  webhook: "",
};

export default function CreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "schema",
    control: form.control,
  });

  // router
  const router = useRouter();

  // state declarations
  const [loading, setLoading] = React.useState<boolean>(false);

  // Form submit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setLoading(true);
    const apiCall = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/endpoints", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const { id } = await response.json();
        if (response.status === 200) {
          resolve(id);
          router.push(`/endpoints`);
        } else {
          reject(new Error("Something went wrong."));
        }
      } catch (error) {
        reject(new Error("Something went wrong."));
        console.log(error);
      }
    });
    toast.promise(apiCall, {
      loading: "Creating endpoint...",
      success: (data) => "Successfully created.",
      error: (err) => {
        if (err.message === "Unauthorized.") {
          return "You are unauthorized to perform this action.";
        } else {
          return "Something went wrong. Please try again later.";
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint Name</FormLabel>
              <FormControl className="bg-secondary">
                <Input placeholder="Name your endpoint..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Schema */}
        <div className="border-y py-6 my-6 grid gap-2">
          <h3 className="text-sm font-medium">Schema</h3>
          {fields.map((field: any, index: any) => (
            <div
              className="grid grid-cols-2 items-start w-full gap-4"
              key={field.id}
            >
              <FormField
                control={form.control}
                key={field.id}
                name={`schema.${index}.key`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <div className="flex gap-2 items-center">
                        <Input
                          {...field}
                          className="w-full bg-secondary"
                          placeholder="Field name ..."
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`schema.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex gap-2 items-center">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-secondary">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {validationOptions.map((type, index: number) => (
                            <SelectItem key={index} value={type.name}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        className="border w-10 h-10 transition-all p-1"
                        variant="link"
                        onClick={() => remove(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            variant={"outline"}
            onClick={() => {
              append({ key: "", value: "" });
            }}
          >
            Add Field +
          </Button>
        </div>

        {/* Webhook */}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="webhookEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="">Include Webhook</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("webhookEnabled") && (
            <FormField
              control={form.control}
              name="webhook"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Webhook</FormLabel>
                  <FormControl className="w-full">
                    <div className="flex gap-2 items-center">
                      <Input
                        {...field}
                        className="w-full bg-secondary"
                        placeholder="Webhook URL ..."
                        disabled={!form.watch("webhookEnabled")}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button
          type="submit"
          variant={"secondary"}
          className="mt-12"
          disabled={loading}
        >
          Create Endpoint
        </Button>
      </form>
    </Form>
  );
}
