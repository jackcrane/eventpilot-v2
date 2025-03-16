import React, { useEffect } from "react";
import { Dropdown, Spinner, Button } from "tabler-react-2";
import { Icon } from "../../util/Icon";
import styles from "./orgselector.module.css";
import { useOrganizations } from "../../hooks/useOrganizations";
import { useParams } from "react-router-dom";
import { useOrganization } from "../../hooks/useOrganization";

const truncate = (str, n = 14) => {
  if (str.length <= n) return str;
  return str.slice(0, n - 1) + "...";
};

export const OrgSelector = ({
  collapsed = false,
  offerCreateOrg = false,
  onSelect = () => {},
  offerHref = false,
}) => {
  const { organizations, loading } = useOrganizations();
  const { orgId } = useParams();
  const { organization } = useOrganization({ id: orgId });

  if (organizations.length === 0) {
    return (
      <Button>
        <Spinner size="sm" />
      </Button>
    );
  }

  return (
    <Dropdown
      hideToggleIcon={collapsed}
      prompt={
        organization?.id ? (
          <div className={styles.orgrow}>
            <img src={organization.icon.location} />
            {!collapsed && <span>{organization.name}</span>}
          </div>
        ) : !collapsed ? (
          "Select Organization"
        ) : (
          <Icon i="chevron-down" size={18} />
        )
      }
      toggleStyle={{
        width: "100%",
      }}
      items={[
        ...organizations.map((org) => ({
          type: "item",
          href: offerHref && `/organization/${org.id}`,
          id: org.id,
          text: (
            <div className={styles.orgrow} data-org={JSON.stringify(org)}>
              <img src={org.icon.location} />
              {<span>{truncate(org.name)}</span>}
            </div>
          ),
        })),
        offerCreateOrg &&
          organizations.length > 0 && {
            type: "divider",
          },
        offerCreateOrg && {
          type: "item",
          href: "/organization/new",
          text: "Create a new organization",
        },
      ].filter(Boolean)}
    />
  );
};
