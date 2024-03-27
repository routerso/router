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

type EndpointPayload = {
  userId: string;
  name: string;
  schema: Record<string, ValidationType>;
  enabled: boolean;
  webhookEnabled: boolean;
  webhook?: string;
};

type SchemaToZodMap = {
  [P in GeneralSchema["key"]]: ReturnType<
    (typeof validations)[GeneralSchema["value"]]
  >;
};
