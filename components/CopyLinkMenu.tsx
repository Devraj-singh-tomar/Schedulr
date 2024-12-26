"use client";

import { toast } from "sonner";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Link2Icon } from "lucide-react";

interface CopyLinkMenuItemProps {
  meetingUrl: string;
}

export function CopyLinkMenuItem({ meetingUrl }: CopyLinkMenuItemProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("URL copied to clipboard");
    } catch (err) {
      console.error("Could not copy text: ", err);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2Icon className="mr-2 h-4 w-4" />
      <span>Copy</span>
    </DropdownMenuItem>
  );
}
