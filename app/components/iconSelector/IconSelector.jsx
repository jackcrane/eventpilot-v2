import { useEffect, useMemo, useRef, useState } from "react";
import data from "./IconSelector.data.json";
import { Button, Card, Input } from "tabler-react-2";
import styles from "./iconselector.module.css";
import { Icon } from "../../util/Icon";

const searchItems = (query) => {
  const lowerQuery = query.toLowerCase();

  return data
    .map((item) => {
      const nameMatch = item.name.toLowerCase().includes(lowerQuery);
      const spacedNameMatch = item.name
        .replace(/-/g, " ")
        .toLowerCase()
        .includes(lowerQuery);
      const tagMatch = item.tags.some((tag) =>
        tag.toLowerCase().includes(lowerQuery)
      );

      let priority = 0;
      if (nameMatch) priority += 2;
      if (spacedNameMatch) priority += 1;
      if (tagMatch) priority += 0.5;

      return { item, priority };
    })
    .filter((result) => result.priority > 0)
    .sort((a, b) => b.priority - a.priority)
    .map((result) => result.item);
};

export const IconSelector = ({ value, onChange }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const filteredResults = useMemo(() => searchItems(query), [query]);

  const popupRef = useRef(null);

  // Prevent the popup from falling outside the screen
  useEffect(() => {
    const popup = popupRef.current;
    if (popup) {
      const { top, left, bottom, right } = popup.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      console.log(
        bottom,
        windowHeight,
        bottom > windowHeight,
        windowHeight - bottom
      );

      if (bottom > windowHeight) {
        popup.style.top = `${windowHeight - bottom}px`;
        popup.style.bottom = null;
        console.log("bottom");
      }
    }
  }, [open, filteredResults]);

  useEffect(() => {
    if (value) {
      setSelectedIcon(value);
    }
  }, [value]);

  useEffect(() => {
    if (selectedIcon) {
      onChange?.(selectedIcon);
    }
  }, [selectedIcon]);

  return (
    <div className={styles.container}>
      <Button onClick={() => setOpen(!open)} className="dropdown-toggle">
        {selectedIcon ? (
          <Icon
            i={selectedIcon}
            size={18}
            style={{ transform: "scale(1.3)" }}
          />
        ) : (
          "Pick an icon"
        )}
      </Button>
      {open && (
        <>
          <div className={styles.clickHost} onClick={() => setOpen(false)} />
          <Card className={styles.popup}>
            <Input
              type="text"
              placeholder="Search icons..."
              value={query}
              onInput={(e) => setQuery(e)}
            />
            <div className={[styles.results, "mb-3"].join(" ")}>
              {filteredResults.slice(0, 200).map((item) => (
                <Button
                  key={item.name}
                  onClick={() => setSelectedIcon(item.name)}
                  data-icon={item.name}
                  size="sm"
                  className={
                    selectedIcon === item.name ? "btn-outline-primary" : ""
                  }
                >
                  <Icon i={item.name} size={24} />
                </Button>
              ))}
            </div>
            {filteredResults.slice(0, 200).length === 200 && (
              <i className="text-secondary">
                There are more icons, please refine your search.
              </i>
            )}
          </Card>
        </>
      )}
    </div>
  );
};
