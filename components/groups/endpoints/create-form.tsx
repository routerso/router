"use client";

import * as React from "react";

// type imports
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";

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
  name: z.string().min(2, "Not a valid name.").nonempty(),
  schema: z
    .array(
      z.object({
        key: z.string().nonempty({ message: "Please enter a valid keyword." }),
        value: z
          .string()
          .nonempty({ message: "Please enter a valid headline." }),
      })
    )
    .min(1, { message: "Please enter at least one keyword" }),
});

type DomainValues = z.infer<typeof formSchema>;

const defaultValues: Partial<DomainValues> = {
  name: "",
  schema: [{ key: "", value: "" }],
};

const types = [
  {
    id: "1",
    name: "Offer 1",
  },
  {
    id: "2",
    name: "Offer 2",
  },
  {
    id: "3",
    name: "Offer 3",
  },
];

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
  type FormValues = z.infer<typeof formSchema>;

  // router
  //   const router = useRouter();

  // state declarations
  const [loading, setLoading] = React.useState<boolean>(false);

  // Form submit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // setLoading(true);
    // const apiCall = new Promise(async (resolve, reject) => {
    //   try {
    //     const response = await fetch("/api/campaign", {
    //       method: "POST",
    //       body: JSON.stringify(values),
    //     });
    //     const { id } = await response.json();
    //     if (response.status === 200) {
    //       resolve(id);
    //       setTimeout(() => {
    //         router.push(`/campaigns/${id}`);
    //       }, 1500);
    //     } else {
    //       reject(new Error("Something went wrong."));
    //     }
    //   } catch (error) {
    //     reject(new Error("Something went wrong."));
    //     console.log(error);
    //   }
    // });
    // toast.promise(apiCall, {
    //   loading: "Creating campaign...",
    //   success: (data) => "Successfully created. Redirecting...",
    //   error: (err) => {
    //     if (err.message === "Something went wrong.") {
    //       return "You are unauthorized to perform this action.";
    //     } else {
    //       return "Something went wrong. Please try again later.";
    //     }
    //   },
    // });
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
        {/*  Offer Selection */}
        {/* <div className="flex gap-4 my-4">
          <FormField
            control={form.control}
            name="offer"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Offer</FormLabel>
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
                    {offers.map((offer) => (
                      <SelectItem key={offer.id} value={offer.id}>
                        {offer.name}
                      </SelectItem>
                    ))}
                    <Link
                      href="/offers"
                      className="w-full text-sm pl-8 py-1 flex gap-2 items-center"
                    >
                      Add Offer
                    </Link>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        {/* Schema */}
        <div className="border-y py-6 my-6 grid gap-2">
          <h3 className="text-sm font-medium">Schema</h3>
          {fields.map((field: any, index: any) => (
            <div className="flex items-center w-full gap-4" key={field.id}>
              {/* Headline Field */}{" "}
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
                          {types.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                          {/* <Link
                            href="/offers"
                            className="w-full text-sm pl-8 py-1 flex gap-2 items-center"
                          >
                            Add Offer
                          </Link> */}
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
