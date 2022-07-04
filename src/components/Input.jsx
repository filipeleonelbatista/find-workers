import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/components/Input.module.css";
import { dateToString, stringToDate } from "../utils/string";

function Input({
  id,
  label,
  placeholder,
  onChange,
  value,
  required,
  type,
  disabled,
  tip = false,
  ...rest
}) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && "*"}
        </label>
      )}
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={`${placeholder && required ? placeholder + "*" : ""}`}
        type={type}
        disabled={disabled}
        {...rest}
      />
      {
        tip && <p className={styles.tipContent}>{tip}</p>
      }
    </div>
  );
}

export default Input;
