import React from "react";
import "../css/button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export default function Button(
  props: Readonly<ButtonProps>,
) {
  // From Uiverse.io by Satwinder04
  return (
    <button {...props}>
      <span className="button_top"> {props.children} </span>
    </button>
  );
}
