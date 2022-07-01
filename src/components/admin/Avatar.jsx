import { useEffect, useState } from "react";
import styles from "../../styles/components/admin/Avatar.module.css";

function Avatar({ uri = "", alt = "", avatarName = "" }) {
  const [firstLetters, setFirstLetters] = useState();
  const [isCapital, setIsCapital] = useState(false);

  useEffect(() => {
    const nameSplited = avatarName.split(" ");
    const initials =
      nameSplited.length === 2
        ? nameSplited[0].substring(0, 1).concat(nameSplited[1].substring(0, 1))
        : nameSplited[0].substring(0, 1);
    setFirstLetters(initials);

    setIsCapital(uri === "")

  }, [avatarName]);

  return (
    <div className={styles.container}>
      {uri === "" ? (
        <div className={styles.textAvatar}>
          <p>{firstLetters}</p>
        </div>
      ) : (
        <img src={uri} alt={alt} className={styles.imageAvatar} />
      )}
    </div>
  );
}

export default Avatar;
