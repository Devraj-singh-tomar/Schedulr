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

interface iAppProps {
  fullName: string;
  email: string;
  // profileImage: string;
}

const SettingsForm = ({ email, fullName }: iAppProps) => {
  // const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

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

  // const handleDeleteImage = () => {
  //   setCurrentProfileImage("");
  // };

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
        </CardContent>

        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
