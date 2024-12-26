import { CreateMeetingAction } from "@/app/actions";
import prisma from "@/app/lib/db";
import { RenderCalendar } from "@/components/bookingForm/RenderCalendar";
import { TimeTable } from "@/components/bookingForm/TimeTable";
import { SubmitButton } from "@/components/SubmitButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock3Icon, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (eventUrl: string, username: string) => {
  try {
    const data = await prisma.eventType.findFirst({
      where: {
        url: eventUrl,
        user: {
          userName: username,
        },
        active: true,
      },
      select: {
        id: true,
        description: true,
        title: true,
        duration: true,
        videoCallSoftware: true,
        user: {
          select: {
            image: true,
            name: true,
            availability: {
              select: {
                day: true,
                isActive: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      return notFound();
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const BookingFormRoute = async ({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; eventUrl: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) => {
  const resolvedParams = await params;

  const resolvedSearchParams = await searchParams;

  const { eventUrl, username } = resolvedParams;

  const data = await getData(eventUrl, username);

  const selectedDate = resolvedSearchParams.date
    ? new Date(resolvedSearchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!(await searchParams).date && !!(await searchParams).time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
            <div>
              <img
                src={data.user?.image as string}
                alt="profile image"
                className="size-10 rounded-full"
              />

              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name}
              </p>

              <h1 className="text-xl font-semibold mt-2 ">{data.title}</h1>

              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 grid flex-col gap-y-2">
                <p className="flex items-center">
                  <CalendarIcon className="size-5 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock3Icon className="size-5 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-5 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="" />

            <form
              action={CreateMeetingAction}
              className="flex flex-col gap-y-2"
            >
              <input
                type="hidden"
                name="fromTime"
                value={(await searchParams).time}
              />

              <input
                type="hidden"
                name="eventDate"
                value={(await searchParams).date}
              />

              <input type="hidden" name="meetingLength" value={data.duration} />

              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />

              <input
                type="hidden"
                name="username"
                value={(await params).username}
              />

              <input type="hidden" name="eventTypeId" value={data.id} />

              <div className="flex flex-col gap-y-1">
                <Label>Your Name</Label>
                <Input name="name" placeholder="your name" />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label>Your Email</Label>
                <Input name="email" placeholder="user@example.com" />
              </div>

              <SubmitButton className="w-full mt-4" text="Book Meeting" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
            <div>
              <img
                src={data.user?.image as string}
                alt="profile image"
                className="size-10 rounded-full"
              />

              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name}
              </p>

              <h1 className="text-xl font-semibold mt-2 ">{data.title}</h1>

              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 grid flex-col gap-y-2">
                <p className="flex items-center">
                  <CalendarIcon className="size-5 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock3Icon className="size-5 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-5 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="" />

            <RenderCalendar availability={data.user?.availability as any} />

            <Separator orientation="vertical" className="" />

            <TimeTable
              selectedDate={selectedDate}
              userName={(await params).username}
              duration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingFormRoute;
