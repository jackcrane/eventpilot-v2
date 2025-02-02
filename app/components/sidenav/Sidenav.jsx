import React, { useState } from "react";
import styles from "./sidenav.module.css";
import { Button } from "tabler-react-2/dist/button";
import { Util, Dropdown } from "tabler-react-2";
import { Icon } from "../../util/Icon";
import { OrgSelector } from "../orgSelector/OrgSelector";
import { useNavigate, useParams } from "react-router-dom";
import { EventSelector } from "../eventSelector/EventSelector";
import { Row } from "../../util/Flex";

export const sidenavItems = (activeText) => {
  const { orgId, eventId } = useParams();

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
    orgId && {
      type: "item",
      href: `/organization/${orgId}`,
      text: `Org Home`,
      active: activeText === "organization",
      icon: <Icon i="home" size={18} />,
    },
    orgId && {
      type: "item",
      href: `/organization/${orgId}/sponsors`,
      text: `Sponsors`,
      active: activeText === "sponsors",
      icon: <Icon i="tip-jar" size={18} />,
    },
    orgId && {
      type: "item",
      href: `/organization/${orgId}/settings`,
      text: `Org Settings`,
      active: activeText === "settings",
      icon: <Icon i="settings" size={18} />,
    },
    orgId && {
      type: "divider",
    },
    orgId && {
      type: "custom",
      content: ({ collapsed }) => (
        <EventSelector
          collapsed={collapsed}
          offerCreateEvent={true}
          offerHref={true}
        />
      ),
    },
    orgId &&
      eventId && {
        type: "item",
        href: `/organization/${orgId}/event/${eventId}`,
        text: `Event Home`,
        active: activeText === "home",
        icon: <Icon i="home" size={18} />,
      },
    orgId &&
      eventId && {
        type: "item",
        href: `/organization/${orgId}/event/${eventId}/participants`,
        text: `Participants`,
        active: activeText === "participants",
        icon: <Icon i="users" size={18} />,
      },
    orgId &&
      eventId && {
        type: "item",
        href: `/organization/${orgId}/event/${eventId}/checklist`,
        text: `Checklist`,
        active: activeText === "todo",
        icon: <Icon i="checklist" size={18} />,
      },
    orgId &&
      eventId && {
        type: "item",
        href: `/organization/${orgId}/event/${eventId}/knowledge-base`,
        text: `Knowledge Base`,
        active: activeText === "knowledge",
        icon: <Icon i="book" size={18} />,
      },
    // orgId &&
    //   eventId && {
    //     type: "item",
    //     href: `/organization/${orgId}/event/${eventId}/volunteer`,
    //     text: `Volunteers`,
    //     active: activeText === "volunteer",
    //     icon: <Icon i="heart" size={18} />,
    //   },
    orgId &&
      eventId && {
        type: "custom",
        content: ({ collapsed }) => (
          <Dropdown
            hideToggleIcon={collapsed}
            prompt={
              <Row gap={1}>
                <Icon i="heart" size={18} />
                {!collapsed && <span>Volunteers</span>}
              </Row>
            }
            toggleStyle={{
              width: "100%",
            }}
            dropdownClassName={
              activeText === "volunteer" ||
              activeText === "volunteer-registration-builder"
                ? "btn-outline-primary"
                : ""
            }
            items={[
              {
                type: "item",
                href: `/organization/${orgId}/event/${eventId}/volunteer`,
                text: "Volunteers",
                active: activeText === "volunteer",
                icon: <Icon i="heart" size={18} />,
              },
              {
                type: "item",
                href: `/organization/${orgId}/event/${eventId}/volunteer/registration-builder`,
                text: "Registration Builder",
                active: activeText === "volunteer-registration-builder",
                icon: <Icon i="forms" size={18} />,
              },
            ]}
          ></Dropdown>
        ),
      },
    orgId &&
      eventId && {
        type: "item",
        href: `/organization/${orgId}/event/${eventId}/website`,
        text: `Website`,
        active: activeText === "website",
        icon: <Icon i="app-window" size={18} />,
      },
    orgId &&
      eventId && {
        type: "item",
        href: `/organization/${orgId}/event/${eventId}/sponsors`,
        text: `Sponsors`,
        active: activeText === "sponsors",
        icon: <Icon i="tip-jar" size={18} />,
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
  ].filter(Boolean);
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
        flexBasis: collapsed ? 50 : 175,
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
