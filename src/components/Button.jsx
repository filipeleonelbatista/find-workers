import { useState } from "react";
import styles from "../styles/components/Button.module.css";

function Button({
  id,
  children,
  transparent = false,
  disabled = false,
  onClick,
  ...rest
}) {
  const [isProcessingContent, setIsProcessingContent] = useState(false);
  return (
    <button
      className={
        disabled
          ? styles.buttonDisabled
          : transparent
          ? styles.buttonTransparent
          : styles.button
      }
      id={id}
      onClick={() => {
        setIsProcessingContent(true);
        onClick();
        setIsProcessingContent(false);
      }}
      {...rest}
      disabled={disabled === false ? isProcessingContent : disabled}
    >
      {isProcessingContent ? <>Carregando...</> : <>{children}</>}
    </button>
  );
}

export default Button;
