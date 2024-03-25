"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { useSearchParams } from "next/navigation";

import { Mail } from "lucide-react";

const allowedEmails = [
  "cameron.youngblood@gmail.com",
  "bridgertower@gmail.com",
  "kylerooneyx@gmail.com",
];

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Not a valid email" })
    .refine((email) => allowedEmails.includes(email), {
      message: "Email is not permitted",
    }),
});

export default function MagicLinkForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    signIn("resend", { email: values.email, callbackUrl: callbackUrl });
  };

  return (
    <>
      <Form {...form}>
        <p className="text-xs opacity-60">Sign in with email</p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field}></Input>
                </FormControl>
                <FormDescription className="sr-only">
                  Sign in with magic link
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full items-center">
            Send Magic Link <Mail className="w-4 ml-2" />
          </Button>
        </form>
      </Form>
    </>
  );
}
