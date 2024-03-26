// Component Imports
import AccountWidget from "../auth/widget";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle";

// Image Imports
import Logo from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark.svg";

// Icon Imports
import {
  BarChart,
  Contact,
  Layers,
  Settings,
  LifeBuoy,
  Disc3,
} from "lucide-react";

const links = [
  { href: "/", text: "Dashboard", icon: BarChart },
  { href: "/endpoints", text: "Endpoints", icon: Layers },
  { href: "/leads", text: "Leads", icon: Contact },
  { href: "/logs", text: "Logs", icon: Disc3 },
];

const otherLinks = [
  { href: "/support", text: "Support", icon: LifeBuoy },
  { href: "/settings", text: "Settings", icon: Settings },
];

export default function Nav() {
  return (
    <nav className="border-r flex flex-col justify-between">
      <div className="grid gap-8 p-8">
        <Image
          className="dark:block hidden"
          src={Logo}
          alt="Router.so Logo"
          width={120}
          height={30.86}
        ></Image>
        <Image
          className="dark:hidden block"
          src={LogoDark}
          alt="Router.so Logo"
          width={120}
          height={30.86}
        ></Image>
        <div className="grid gap-2">
          {links.map((link) => (
            <NavLink key={link.href} icon={link.icon} href={link.href}>
              {link.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="grid gap-8">
        <div className="grid gap-2 px-8">
          {otherLinks.map((link) => (
            <NavLink key={link.href} icon={link.icon} href={link.href}>
              {link.text}
            </NavLink>
          ))}
        </div>
        <div className="border-t grid gap-8 p-6">
          <AccountWidget />
          <div className="flex justify-between items-center gap-2">
            <ModeToggle />
            <p className="text-xs text-muted-foreground opacity-50">
              © router.so / 9d8, 2024
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ href, children, icon: Icon }: NavLinkProps) => {
  return (
    <Link
      className="flex items-center gap-2 group p-2 rounded-md -ml-2 hover:bg-accent transition-all"
      href={href}
    >
      <Icon
        className="text-muted-foreground group-hover:text-foreground transition-all"
        size={20}
      />
      {children}
    </Link>
  );
};
