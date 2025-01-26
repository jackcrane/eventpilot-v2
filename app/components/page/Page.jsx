import { Header } from "../header/Header";
import { useTitle } from "react-use";
import styled from "styled-components";
import { Sidenav } from "../sidenav/Sidenav";
import { Typography } from "tabler-react-2";
import { Spinner } from "tabler-react-2/dist/spinner";
const { H3 } = Typography;

export const Page = ({ children, title, sidenavItems, loading = false }) => {
  useTitle(title ? `${title} | EventPilot` : "EventPilot");

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: "calc(100dvh - 70px)",
          gap: 10,
          padding: 10,
          paddingBottom: 0,
          maxWidth: 1400,
          margin: "auto",
        }}
      >
        {sidenavItems && <Sidenav items={sidenavItems} />}
        <div
          style={{
            width: "100%",
            overflowX: "hidden",
            padding: 4,
            paddingBottom: 100,
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <H3>Loading...</H3>
              <Spinner size={"lg"} />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
};
