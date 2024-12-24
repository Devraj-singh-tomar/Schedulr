import { useButton, type AriaButtonProps } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";
import { type CalendarState } from "react-stately";
import { Button } from "../ui/button";

export const CalendarButton = (
  props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  }
) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing();

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      ref={ref}
      disabled={props.isDisabled}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </Button>
  );
};
