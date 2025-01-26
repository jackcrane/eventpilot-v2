import React, { useState } from "react";
import styles from "./sidenav.module.css";
import { Button } from "tabler-react-2/dist/button";
import { Util, Dropdown } from "tabler-react-2";
import { Icon } from "../../util/Icon";
import { OrgSelector } from "../orgSelector/OrgSelector";
import { useNavigate } from "react-router-dom";

export const sidenavItems = (activeText) => {
  const navigate = useNavigate();
  const items = [
    {
      type: "custom",
      content: ({ collapsed }) => (
        <OrgSelector
          collapsed={collapsed}
          offerCreateOrg={true}
          offerHref={true}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      type: "item",
      href: `/`,
      text: `Home`,
      active: activeText === "home",
      icon: <Icon i="home" size={18} />,
    },
    {
      type: "divider",
    },
    {
      type: "item",
      href: `/me`,
      text: `Profile`,
      active: activeText === "profile",
      icon: <Icon i="settings" size={18} />,
    },
  ];
  return items;
};

export const Sidenav = ({ items }) => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("collapsed") === "true"
  );

  const collapse = () => {
    const newCollapsed = !collapsed;
    localStorage.setItem("collapsed", newCollapsed);
    setCollapsed(newCollapsed);
  };

  // return <Link to="/sdf">sdf</Link>;

  return (
    <nav
      className={styles.sidenav}
      style={{
        width: collapsed ? 50 : 200,
        transition: "width 0.2s",
      }}
    >
      {items.map((item, index) =>
        item.type === "divider" ? (
          <Util.Hr key={index} />
        ) : item.type === "custom" ? (
          <>
            <item.content collapsed={collapsed} />
          </>
        ) : (
          <Button
            href={item.href}
            variant={item.active && "primary"}
            outline={item.active}
            key={index}
          >
            <Util.Row gap={1}>
              {item.icon && item.icon}
              {!collapsed && item.text}
            </Util.Row>
          </Button>
        )
      )}
      <div style={{ flex: 1 }} />
      <Button onClick={collapse}>
        <Icon i={collapsed ? "chevron-right" : "chevron-left"} size={18} />
        {collapsed ? "" : "Collapse"}
      </Button>
      <div style={{ height: 20 }} />
    </nav>
  );
};
