import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { getLogs } from "@/lib/data/logs";

const pageData = {
  name: "Logs",
  title: "Logs",
  description: "Logs of all your events",
};

export default async function Home() {
  const session = await useSession();
  if (!session) redirect("/login");

  const logs = await getLogs(session?.user?.id);

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <Header title={pageData?.title}>{pageData?.description}</Header>
      <div className="grid gap-4 grid-rows-[500px,1fr]">
        {pageData?.description}
      </div>
      {logs.map((log) => (
        <div key={log.log.id}>{log.log.message}</div>
      ))}
    </>
  );
}
