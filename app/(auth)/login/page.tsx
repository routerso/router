import Image from "next/image";
import Link from "next/link";

import MagicLinkForm from "@/components/auth/form";

export default async function LoginPage() {
  return (
    <section className="flex fixed top-0 right-0 left-0 h-screen w-screen overflow-hidden flex-col items-center justify-center bg-background/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-lg border p-6 shadow-sm md:p-12 mt-12 bg-muted">
        <Image
          className="mb-8 dark:invert"
          src="/icon.svg"
          alt="logo"
          width={50}
          height={72}
        ></Image>
        <p className="text-center text-xl">Welcome to router.so</p>
        <p className="text-center text-muted-foreground">
          Login to access your account.
        </p>
        <div className="flex flex-col items-center w-full gap-2">
          <MagicLinkForm />
        </div>
      </div>
      <p className="mt-4 max-w-xs text-center text-sm text-muted-foreground md:mb-24">
        By using router.so, you agree to our{" "}
        <Link className="underline underline-offset-4" href="/">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link className="underline underline-offset-4" href="/">
          Terms of Service
        </Link>
        .
      </p>
    </section>
  );
}
