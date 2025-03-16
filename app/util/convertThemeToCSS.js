export const convertThemeToCSS = (theme) => {
  const flattenObject = (obj, prefix = "--") =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = `${prefix}${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      if (typeof value === "object" && value !== null) {
        return { ...acc, ...flattenObject(value, `${newKey}-`) };
      }
      return { ...acc, [newKey]: value };
    }, {});

  const cssVariables = flattenObject(theme);
  return Object.entries(cssVariables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
};

export const injectThemeCSS = (theme) => {
  if (!theme) return;
  const style = document.createElement("style");
  style.id = "theme-styles";
  style.innerHTML = `:root { ${convertThemeToCSS(theme)} }`;

  const existingStyle = document.getElementById("theme-styles");
  if (existingStyle) {
    existingStyle.replaceWith(style);
  } else {
    document.head.appendChild(style);
  }
};
