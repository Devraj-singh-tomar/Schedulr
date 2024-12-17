"use client";

import GithubLogo from "@/public/github.svg";
import GoogleLogo from "@/public/google.svg";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const GoogleAuthButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={"outline"} className="w-full">
          <Loader2Icon className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant={"outline"} className="w-full">
          <Image src={GoogleLogo} alt="logo" className="size-4" />
          Google
        </Button>
      )}
    </>
  );
};

export const GithubAuthButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={"outline"} className="w-full">
          <Loader2Icon className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant={"outline"} className="w-full">
          <Image src={GithubLogo} alt="logo" className="size-4" />
          GitHub
        </Button>
      )}
    </>
  );
};
