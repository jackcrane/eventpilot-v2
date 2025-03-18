import styles from "./Text.module.css";
import { Icon } from "../../../../util/Icon";

export const TextField = ({ field }) => {
  return (
    <div className={styles.container}>
      <label>{field.label}</label>
      {/* <p>{field.description}</p> */}
      <div style={{ gap: 0 }}>
        {field.description.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
};
