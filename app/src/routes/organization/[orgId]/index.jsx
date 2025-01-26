import React from "react";
import { Page } from "../../../../components/page/Page";
import { sidenavItems } from "../../../../components/sidenav/Sidenav";
import { useParams } from "react-router-dom";
import { useOrganization } from "../../../../hooks/useOrganization";
import { Row } from "../../../../util/Flex";
import { Breadcrumbs } from "../../../../components/breadcrumbs/Breadcrumbs";

export const Organization = () => {
  const { orgId } = useParams();
  const { organization, loading } = useOrganization({ id: orgId });

  return (
    <Page
      title={organization.name}
      sidenavItems={sidenavItems("")}
      loading={loading}
    >
      <h1>{organization.name}</h1>
    </Page>
  );
};
