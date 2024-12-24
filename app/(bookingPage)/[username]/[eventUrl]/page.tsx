import prisma from "@/app/lib/db";
import { Calendar } from "@/components/bookingForm/Calendar";
import { RenderCalendar } from "@/components/bookingForm/RenderCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock3Icon, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (eventUrl: string, username: string) => {
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
};

const BookingFormRoute = async ({
  params,
}: {
  params: Promise<{ username: string; eventUrl: string }>;
}) => {
  const resolvedParams = await params;

  const { eventUrl, username } = resolvedParams;

  const data = await getData(eventUrl, username);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
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
                  23 December 2024
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

          <RenderCalendar />

          <Separator orientation="vertical" className="" />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingFormRoute;
