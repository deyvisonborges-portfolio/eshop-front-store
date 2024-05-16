import { ComponentPropsWithRef, forwardRef, ReactNode, useMemo } from "react";

import styles from "./input.module.scss";
import classNames from "classnames";

type InputTypeProps = "text" | "password" | "email";

interface InputProps extends ComponentPropsWithRef<"input"> {
  name: string;
  label?: string;
  message?: string;
  variant?: "default" | "underline";
  type?: InputTypeProps;
}

const renderPlaceholderTypeText: Record<InputTypeProps, string> = {
  text: "Digite aqui",
  password: "Senha",
  email: "Digite aqui seu e-mail",
} as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { name, message, label, variant = "default", type = "text", ...props },
    ref
  ) => {
    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={renderPlaceholderTypeText[type]}
          className={classNames(styles.input, styles[`input-${variant}`])}
        />
        {message && <span className={styles["helper-text"]}>{message}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";