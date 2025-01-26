import React, { useEffect, useState } from "react";
import { useAuth, useEmailPreferences, useLogs } from "../../hooks";
import { Page } from "../../components/page/Page";
import { sidenavItems } from "../../components/sidenav/Sidenav";

export const Index = () => {
  const { user } = useAuth();

  return (
    <Page title="Home" sidenavItems={sidenavItems("home")}>
      <h1>
        Good {new Date().getHours() < 12 ? "morning" : "afternoon"}, {user.name}
        !
      </h1>
    </Page>
  );
};
