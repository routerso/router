"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  name: z.string(),
  email: z.string().email(),
  query: z.string(),
});

type FormData = z.infer<typeof schema>;

export const RouterForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form action="https://app.router.so/api/endpoints/6" method="POST">
        <FormField<FormData>
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter name" />
              </FormControl>
              <FormDescription>
                Enter the name for the endpoint.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<FormData>
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email" />
              </FormControl>
              <FormDescription>
                Enter the email for the endpoint.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<FormData>
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>query</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter query" />
              </FormControl>
              <FormDescription>
                Enter the query for the endpoint.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
