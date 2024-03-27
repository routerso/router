type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon: Icon;
};

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

type validationType =
  | "phone"
  | "email"
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "url"
  | "zipCode";
