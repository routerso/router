export const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-4xl">{title}</h1>
      {children && <h3 className="text-muted-foreground">{children}</h3>}
    </section>
  );
};
