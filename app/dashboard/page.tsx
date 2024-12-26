import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  CopyIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  PenIcon,
  Trash2Icon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { CopyLinkMenuItem } from "@/components/CopyLinkMenu";
import { MenuActiveSwitch } from "@/components/EventTypeSwitch";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      userName: true,

      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const DashboardPage = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="you have no events"
          description="you can create an event by clicking the button below"
          buttonText="Add event type"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2 ">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold ">
                Event Type
              </h1>
              <p className="text-muted-foreground">
                Create and manage your event type here
              </p>
            </div>

            <Button asChild>
              <Link href={"/dashboard/new"}>Create new Event</Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
            {data.eventType.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden shadow rounded-lg border relative"
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} size={"icon"}>
                        <EllipsisVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-20" align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>

                      <DropdownMenuSeparator className="w-24 mx-auto" />

                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.userName}/${item.url}`}>
                            <ExternalLinkIcon className="mr-2 size-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>

                        <CopyLinkMenuItem
                          meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${item.url}`}
                        />

                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}`}>
                            <PenIcon className="mr-2 size-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="w-24 mx-auto" />

                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}/delete`}>
                            <Trash2Icon className="mr-2 size-4" />
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href={"/"} className="flex items-center p-5">
                  <div className="flex-shrink-0">
                    <Users2Icon className="size-6" />
                  </div>

                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {item.duration} minutes metting
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>

                <div className="dark:bg-neutral-700 px-5 py-3 justify-between flex items-center">
                  <MenuActiveSwitch
                    initialChecked={item.active}
                    eventTypeId={item.id}
                  />

                  <Button asChild>
                    <Link href={`/dashboard/event/${item.id}`}>Edit Event</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;
