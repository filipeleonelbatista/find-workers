import styles from "../styles/components/Textarea.module.css";

function Textarea({ id, label, placeholder, tip = false, onChange, value, ...rest }) {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...rest}
      ></textarea>

      {
        tip && <p className={styles.tipContent}>{tip}</p>
      }
    </div>
  );
}

export default Textarea;
