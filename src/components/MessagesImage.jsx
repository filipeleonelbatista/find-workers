import styles from "../styles/components/MessagesImage.module.css"
export default function MessagesImage({source, title, paragraph, children}) {
  return (
    <div className={styles.container}>
      <img src={source} alt={title} />
      <h2>{title}</h2>
      <p>
        {paragraph}
      </p>
      {children}
    </div>
  );
}
