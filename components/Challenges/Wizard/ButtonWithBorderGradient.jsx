"use client";

import {Button} from "@nextui-org/react";
import Link from "next/link";

export const ButtonWithBorderGradient = ({
  children,
  background = "--nextui-background",
  style: styleProp,
  ...props
}) => {
    const linearGradientBg = background.startsWith("--") ? `hsl(var(${background}))` : background;

    const style = {
        border: "solid 2px transparent",
        backgroundImage: `linear-gradient(${linearGradientBg}, ${linearGradientBg}), linear-gradient(to right, #F871A0, #9353D3)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
    };

  return (
    <Button
      as={Link}
      href="#"
      {...props}
      style={{
        ...style,
        ...styleProp,
      }}
      type="submit"
    >
      {children}
    </Button>
  );
};
