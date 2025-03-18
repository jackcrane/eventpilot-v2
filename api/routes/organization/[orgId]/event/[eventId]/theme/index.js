export const get = [
  async (req, res) => {
    return res.json({
      theme: {
        colors: {
          primary: "#7a5c58", // Elegant muted copper
          secondary: "#526760", // Deep desaturated teal
          background: "#f8f6f3", // Soft off-white
          surface: "#ede9e6", // Slightly warmer off-white for cards and panels
          text: "#2e2a26", // Rich espresso brown for readability
          textSecondary: "#6d665f", // Muted taupe for subtle contrast
          border: "#b8b2ac", // Soft neutral gray for refined borders
          success: "#6b8e6b", // Subdued forest green
          warning: "#d1a05a", // Muted golden amber
          error: "#9c5c5c", // Deep rosewood red
          info: "#5c738c", // Desaturated blue-gray
        },
        fonts: {
          heading: {
            loader: "https://fonts.googleapis.com/css2?family=Yeseva+One",
            fontFace: "'Yeseva One'",
            weight: 400,
          },
          body: {
            loader: "https://fonts.googleapis.com/css2?family=Roboto",
            fontFace: "Roboto",
          },
          // heading: "'DM Serif Display', serif",
          // monospace: "'Fira Code', monospace",
        },
        fontSizes: {
          xs: "12px",
          sm: "14px",
          md: "16px",
          lg: "18px",
          xl: "24px",
          xxl: "32px",
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "16px",
          lg: "24px",
          xl: "32px",
          xxl: "48px",
        },
        borders: {
          none: "none",
          thin: "1px solid",
          medium: "2px solid",
          thick: "4px solid",
        },
        borderRadius: {
          none: "0",
          sm: "4px",
          md: "8px",
          lg: "16px",
          xl: "24px",
          full: "9999px",
        },
        shadows: {
          sm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          md: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          lg: "0px 4px 8px rgba(0, 0, 0, 0.15)",
          xl: "0px 6px 12px rgba(0, 0, 0, 0.2)",
        },
        transitions: {
          fast: "150ms ease-in-out",
          medium: "300ms ease-in-out",
          slow: "500ms ease-in-out",
        },
        breakpoints: {
          xs: "480px",
          sm: "768px",
          md: "1024px",
          lg: "1280px",
          xl: "1440px",
        },
        configurables: {
          borderRadiusMultiplier: 1,
        },
      },
    });
  },
];
