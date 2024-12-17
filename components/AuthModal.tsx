import { signIn } from "@/app/lib/auth";
import Logo from "@/public/calendar1.png";
import Image from "next/image";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const AuthModal = () => {
  const signInGoogle = async () => {
    "use server";
    await signIn("google");
  };

  const signInGithub = async () => {
    "use server";
    await signIn("github");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row justify-center items-center gap-1">
          <Image src={Logo} alt="logo" className="size-10" />

          <DialogTitle className="text-3xl font-semibold uppercase">
            Sche<span className="text-primary">dulr</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-xl">
          Sign In
        </DialogDescription>

        <div className="flex flex-col gap-2 ">
          <form action={signInGoogle} className="w-full">
            <GoogleAuthButton />
          </form>

          <form action={signInGithub}>
            <GithubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
