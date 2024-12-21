"use client";

import React, { useActionState, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SubmitButton } from "./SubmitButtons";
import { SettingsAction } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "@/app/lib/zodSchemas";
import { Button } from "./ui/button";
import { Files, XIcon } from "lucide-react";
import { Lakki_Reddy } from "next/font/google";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { toast } from "sonner";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

const SettingsForm = ({ email, fullName, profileImage }: iAppProps) => {
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [lastResult, action] = useActionState(SettingsAction, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account setings</CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="your name"
              defaultValue={fullName}
              name={fields.fullName.name}
              key={fields.fullName.key}
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input disabled placeholder="test@test.com" defaultValue={email} />
          </div>

          <div className="grid gap-y-2">
            <Label>Profile Image</Label>

            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />

            {currentProfileImage ? (
              <div className="relative size-16">
                <img
                  src={currentProfileImage}
                  alt="profile image"
                  className="size-14 rounded-lg"
                />

                <Button
                  onClick={handleDeleteImage}
                  variant={"destructive"}
                  size={"sm"}
                  type="button"
                  className="absolute -top-1 -right-2 w-3 h-6"
                >
                  <XIcon />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success("Profile image has been uploaded");
                }}
                onUploadError={(err) => {
                  console.log("something went wrong", err);
                  toast.error(err.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
