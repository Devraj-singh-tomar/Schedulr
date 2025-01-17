import { DashboardLinks } from "@/components/DasboardLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/public/calendar1.png";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut } from "../lib/auth";
import { requireUser } from "../lib/hooks";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      userName: true,
      grantId: true,
    },
  });

  if (!data?.userName) {
    return redirect("/onboarding");
  }

  if (!data.grantId) {
    return redirect("/onboarding/grant-id");
  }

  return data;
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  const logoutHandler = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src={Logo} alt="logo" className="size-8" />

                <p className="text-xl font-bold uppercase">
                  Sche<span className="text-primary">dulr</span>
                </p>
              </Link>
            </div>

            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm gap-3 font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <MenuIcon className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <img
                      src={session?.user?.image || "/user.png"}
                      alt="profile image"
                      width={20}
                      height={20}
                      className="w-full h-full rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuSeparator className="w-24 mx-auto" />

                  <DropdownMenuItem className="" asChild>
                    <Link className="cursor-pointer" href="/dashboard/settings">
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="w-24 mx-auto" />

                  <DropdownMenuItem asChild>
                    <form className="w-full" action={logoutHandler}>
                      <button className="w-full text-left">Logout</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton />
    </>
  );
};

export default DashboardLayout;
