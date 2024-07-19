export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 border overflow-scroll no-scrollbar rounded-lg bg-muted/50 h-full">
      {children}
    </div>
  );
}
