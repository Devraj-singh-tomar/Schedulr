"use client";

import Link from "next/link";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CreateEventTypeAction, EditEventTypeAction } from "@/app/actions";
import { eventTypeSchema } from "@/app/lib/zodSchemas";

interface iAppProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export function EditEventTypeForm({
  description,
  duration,
  title,
  url,
  callProvider,
  id,
}: iAppProps) {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(
    callProvider as VideoCallProvider
  );

  const [lastResult, action] = useActionState(EditEventTypeAction, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit your appointment</CardTitle>

          <CardDescription>
            Edit your appointment type that allows people to book you.
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <input type="hidden" name="id" value={id} />

          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="30 minute meeting"
              />

              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>

            <div className="grid gap-y-2 ">
              <Label>URL Slug</Label>

              <div className="flex rounded-md">
                <Input
                  type="text"
                  name={fields.url.name}
                  defaultValue={url}
                  key={fields.url.key}
                  placeholder="example-user-1"
                />
              </div>

              <p className="text-red-500 text-sm">{fields.url.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
                className="min-h-10 max-h-20"
                placeholder="A 30 minute meeting to discuss your project."
              />

              <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>

            <div className="grid gap-y-2">
              <Label>Duration</Label>

              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
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

              <p className="text-red-500 text-sm">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>

              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />

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

              <p className="text-red-500 text-sm">
                {fields.videoCallSoftware.errors}
              </p>
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-between">
            <Button asChild variant="outline">
              <Link href="/dashboard">Cancel</Link>
            </Button>

            <SubmitButton text="Edit Event" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
