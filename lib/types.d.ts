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
  | "zipCode";

type EndpointPayload = {
  userId: string;
  name: string;
  schema: Record<string, ValidationType>;
  enabled: boolean;
  webhookEnabled: boolean;
  webhook?: string;
};
