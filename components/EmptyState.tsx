import Link from "next/link";
import { Button } from "./ui/button";
import { BanIcon, PlusCircleIcon } from "lucide-react";

interface AppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({ buttonText, description, href, title }: AppProps) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <BanIcon className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-xs mx-auto">
        {description}
      </p>

      <Button asChild>
        <Link href={href}>
          <PlusCircleIcon className="size-4" /> {buttonText}
        </Link>
      </Button>
    </div>
  );
}
