"use client";

import { ButtonGroup } from "@/components/ButtonGroup";
import { SubmitButton } from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React, { useState } from "react";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

const NewEventRoute = () => {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment</CardTitle>

          <CardDescription>
            Create a new appointment type to share with your clients.
          </CardDescription>
        </CardHeader>

        <form action="" noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input placeholder="30 minute meeting" />
            </div>

            <div className="grid gap-y-2 ">
              <Label>URL Slug</Label>

              <div className="flex rounded-md">
                <Input type="text" placeholder="example-user-1" />
              </div>
            </div>

            <div className="grid gap-y-2">
              <Label>Description</Label>
              <Textarea
                className="min-h-10 max-h-20"
                placeholder="A 30 minute meeting to discuss your project."
              />
            </div>

            <div className="grid gap-y-2">
              <Label>Duration</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select the duration" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <ButtonGroup className="w-full">
                <Button
                  onClick={() => setActivePlatform("Zoom Meeting")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                >
                  Zoom
                </Button>

                <Button
                  onClick={() => setActivePlatform("Google Meet")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }
                >
                  Google Meet
                </Button>

                <Button
                  onClick={() => setActivePlatform("Microsoft Teams")}
                  className="w-full"
                  type="button"
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-between">
            <Button asChild variant="outline">
              <Link href="/dashboard">Cancel</Link>
            </Button>

            <SubmitButton text="Create Event" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewEventRoute;
