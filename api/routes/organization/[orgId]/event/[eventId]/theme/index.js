export const get = [
  async (req, res) => {
    return res.json({
      theme: {
        colors: {
          primary: "#0a837f",
          secondary: "#ff6b6b",
          background: "#f8f9fa",
          surface: "#ffffff",
          text: "#212529",
          textSecondary: "#6c757d",
          border: "#dee2e6",
          success: "#28a745",
          warning: "#ffc107",
          error: "#dc3545",
          info: "#17a2b8",
        },
        fonts: {
          body: {
            loader: "https://fonts.googleapis.com/css2?family=Red+Hat+Display",
            fontFace: "'Red Hat Display'",
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
      },
    });
  },
];
