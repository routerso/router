import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <Breadcrumbs />
      <Header title="Router.so">Welcome to Router.so</Header>
      <div className="grid gap-4 grid-rows-[500px,1fr]">Hello world</div>
    </>
  );
}
