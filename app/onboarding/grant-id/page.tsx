import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Photo from "@/public/hourglass.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2Icon } from "lucide-react";

const OnBoardingRouteTwo = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center ">
      <Card>
        <CardHeader>
          <CardTitle>You Are Almost Done!</CardTitle>

          <CardDescription>
            We have to now connect your calendar to your account.
          </CardDescription>

          <Image
            src={Photo}
            alt="Almost Finished"
            className="size-32 mx-auto rounded-lg"
          />
        </CardHeader>

        <CardContent>
          <Button className="w-full" asChild>
            <Link href="/api/auth">
              <CalendarCheck2Icon className="size-4 mr-2" />
              Connect Calender to Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnBoardingRouteTwo;
