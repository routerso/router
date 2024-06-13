import { toast } from "sonner";

export function createClientAction(createParamWithId: ServerActionFunction) {
  return async function clientAction(formData: FormData) {
    const result = await createParamWithId(formData);
    console.log(result);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Success");
    }
  };
}
