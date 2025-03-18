import { Icon } from "../../../../util/Icon";
import styles from "./Text.module.css";

export const StringField = ({ field, onChange, valid }) => {
  return (
    <div className={[styles.container, valid ? "" : styles.invalid].join(" ")}>
      <label htmlFor={field.id}>{field.label}</label>
      <div className={styles.input}>
        <div className={styles.icon}>
          <Icon i={field.icon} />
        </div>
        <input
          type="text"
          id={field.id}
          name={field.id}
          placeholder={field.hint}
          onChange={(v) => onChange(v.target.value)}
          value={field.value}
        />
      </div>
      {field.required && (
        <span className={styles.required}>* this field is required</span>
      )}
      {field.description && <span>{field.description}</span>}
    </div>
  );
};
