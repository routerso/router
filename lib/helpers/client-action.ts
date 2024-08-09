import { toast } from "sonner";

/**
 * Creates a client action function that handles form data and calls the provided server action function.
 *
 * @param createParamWithId - The server action function to be called with the form data.
 * @returns A client action function that handles the form data and displays a success or error toast message.
 */
export function createClientAction(
  createParamWithId: ServerActionFunction
): (formData: FormData) => Promise<void> {
  return async function clientAction(formData: FormData) {
    const result = await createParamWithId(formData);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Success!");
    }
  };
}
