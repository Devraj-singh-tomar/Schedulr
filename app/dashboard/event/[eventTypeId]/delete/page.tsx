import { deleteEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const DeleteEventType = async ({
  params,
}: {
  params: Promise<{ eventTypeId: string }>;
}) => {
  const resolvedParams = await params;

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Delete Event</CardTitle>
          <CardDescription>
            Are you sure you want to delete this event?
          </CardDescription>
        </CardHeader>

        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="outline">
            <Link href="/dashboard">Cancel</Link>
          </Button>

          <form action={deleteEventTypeAction}>
            <input type="hidden" name="id" value={resolvedParams.eventTypeId} />
            <SubmitButton text="Delete event" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteEventType;
