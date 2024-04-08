import { Pin, Slash } from "lucide-react";

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <section className="flex font-light gap-2 text-lg pb-4 mb-6 border-b items-center">
      <h1 className="font-normal">{title}</h1>
      {children && <h3 className="text-muted-foreground">: {children}</h3>}
    </section>
  );
};
