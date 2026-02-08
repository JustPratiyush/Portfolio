import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";

const pillClassName =
  "z-50 pointer-events-auto flex min-h-14 h-14 max-[400px]:min-h-12 max-[400px]:h-12 items-center justify-center px-1 max-[400px]:px-0.5 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-full";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 max-[400px]:mb-3 flex origin-bottom h-full max-h-14 max-[400px]:max-h-12">
      <div className="fixed bottom-0 inset-x-0 h-16 max-[400px]:h-14 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <div className="pointer-events-auto relative mx-auto flex min-h-full h-full items-center gap-4 max-[400px]:gap-2">
        <Dock className={pillClassName}>
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 max-[400px]:size-10 text-blue-500",
                    )}
                  >
                    <item.icon className="size-4 max-[400px]:size-3.5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
        <Dock className={pillClassName}>
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 max-[400px]:size-10",
                      )}
                    >
                      <social.icon className="size-4 max-[400px]:size-3.5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
        </Dock>
        <Dock
          className={cn(
            pillClassName,
            "!w-14 !min-w-14 max-[400px]:!w-12 max-[400px]:!min-w-12 shrink-0",
          )}
        >
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}
