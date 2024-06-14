import { Main, Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import Light from "@/public/light.png";
import Dark from "@/public/dark.png";

export default function Home() {
  return (
    <Main>
      <Section>
        <Container>
          <Badge variant="outline">Currently in development</Badge>
          <h1 className="pt-6">Manage your forms and capture leads.</h1>
          <h2 className="!mt-0">
            Router.so is headless{" "}
            <span className="underline underline-offset-4 decoration-muted-foreground decoration-wavy">
              form handling
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-4 decoration-muted-foreground decoration-wavy">
              lead routing
            </span>{" "}
            for marketing-minded developers. Created by the dev studio{" "}
            <a href="https://9d8.dev">9d8</a>.
          </h2>
          <a href="https://app.router.so">
            <Image
              src={Light}
              className="dark:hidden rounded-xl border hover:blur-sm transition-all"
              alt="Router.so Light Mode"
            />
          </a>
          <a href="https://app.router.so">
            <Image
              src={Dark}
              className="hidden dark:block rounded-xl border hover:blur-sm transition-all"
              alt="Router.so Dark Mode"
            />
          </a>
          <Button className="not-prose mt-6" asChild variant="outline">
            <a href="https://app.router.so">Sign up for the Beta</a>
          </Button>
        </Container>
      </Section>
    </Main>
  );
}
