import React from "react";
import { Dropdown } from "tabler-react-2";
import { Icon } from "../../util/Icon";
import styles from "./orgselector.module.css";
import { useOrganizations } from "../../hooks/useOrganizations";

export const OrgSelector = ({
  collapsed = false,
  offerCreateOrg = false,
  onSelect = () => {},
  offerHref = false,
}) => {
  const { organizations, loading } = useOrganizations();

  return (
    <Dropdown
      hideToggleIcon={collapsed}
      prompt={
        !collapsed ? "Select Organization" : <Icon i="chevron-down" size={18} />
      }
      toggleStyle={{
        width: "100%",
      }}
      items={[
        ...organizations.map((org) => ({
          type: "item",
          href: offerHref && `/organization/${org.id}`,
          text: (
            <div className={styles.orgrow}>
              <img src={org.icon.location} />
              <span>{org.name}</span>
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
