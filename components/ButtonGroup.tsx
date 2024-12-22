"use client";

import { cn } from "@/lib/utils";
import React, { Children, cloneElement, ReactElement } from "react";
import { ButtonProps } from "./ui/button";

interface AppProps {
  className?: string;
  children: ReactElement<ButtonProps>[];
}

export const ButtonGroup = ({ children, className }: AppProps) => {
  const totalButtons = Children.count(children);

  return (
    <div className={cn("flex w-full", className)}>
      {children.map((child, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === totalButtons - 1;

        return cloneElement(child, {
          className: cn(
            {
              "rounded-l-none": !isFirstItem,
              "rounded-r-none": !isLastItem,
              "border-l-0": !isFirstItem,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
};
