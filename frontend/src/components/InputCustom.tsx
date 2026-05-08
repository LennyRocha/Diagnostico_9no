import React from "react";
import "../css/input.css";

interface InputCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export default function InputCustom(
  props: Readonly<InputCustomProps>,
) {
  // From Uiverse.io by Satwinder04
  return (
    <div className="input-container">
      <input type="text" {...props} />
      <label htmlFor="input" className="label">
        {props.label}
      </label>
      <div className="underline"></div>
    </div>
  );
}
