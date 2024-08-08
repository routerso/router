type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon: Icon;
};

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

type GeneralSchema = {
  [key: string]: ValidationType;
};

type ValidationType =
  | "phone"
  | "email"
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "url"
  | "zip_code";

type EndpointPOSTPayload = {
  userId: string;
  name: string;
  schema: { key: string; value: ValidationType }[];
  enabled: boolean;
  formEnabled: boolean;
  successUrl: string;
  failUrl: string;
  webhookEnabled: boolean;
  webhook?: string;
};

type EndpointPUTPayload = {
  id: string;
  userId: string;
  name: string;
  schema: { key: string; value: ValidationType }[];
  enabled: boolean;
  formEnabled: boolean;
  successUrl: string;
  failUrl: string;
  webhookEnabled: boolean;
  webhook?: string;
};

type LeadAndErrorCountResults = {
  date: string;
  leads: number;
  errors: number;
}[];

type SchemaToZodMap = {
  [P in GeneralSchema["key"]]: ReturnType<
    (typeof validations)[GeneralSchema["value"]]
  >;
};

type LogRow = {
  id: string;
  type: "success" | "error";
  message: Record<string, any> | unknown;
  endpoint: string;
  endpointId: string;
  createdAt: Date;
};

type LogMessage =
  | z.SafeParseReturnType<
      {
        [x: string]: any;
      },
      {
        [x: string]: any;
      }
    >
  | { success: string };

type LeadRow = {
  id: string;
  data: { [key: string]: any };
  schema?: { key: string; value: ValidationType }[];
  createdAt: Date;
  updatedAt: Date;
  endpointId: string;
  endpoint?: string;
};

type ServerActionFunction = (
  formData: FormData
) => Promise<{ error: string } | undefined>;
