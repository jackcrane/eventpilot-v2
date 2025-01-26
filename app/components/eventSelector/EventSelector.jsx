import React from "react";
import { Dropdown } from "tabler-react-2";
import { Icon } from "../../util/Icon";
import styles from "../orgSelector/orgselector.module.css";
import { useParams } from "react-router-dom";
import { useEvents } from "../../hooks/useEvents";
import { useEvent } from "../../hooks/useEvent";

const truncate = (str, n = 14) => {
  if (str.length <= n) return str;
  return str.slice(0, n - 1) + "...";
};

export const EventSelector = ({
  collapsed = false,
  offerCreateEvent = false,
  offerHref = false,
}) => {
  const { orgId, eventId } = useParams();
  const { events, loading } = useEvents({ orgId });
  const { event } = useEvent({ orgId, eventId });

  return (
    <Dropdown
      hideToggleIcon={collapsed}
      prompt={
        event?.id ? (
          <div className={styles.orgrow}>
            <img src={event.icon.location} />
            {!collapsed && <span>{truncate(event.name)}</span>}
          </div>
        ) : !collapsed ? (
          "Select Event"
        ) : (
          <Icon i="chevron-down" size={18} />
        )
      }
      toggleStyle={{
        width: "100%",
      }}
      items={[
        ...events.map((event) => ({
          type: "item",
          href: offerHref && `/organization/${orgId}/event/${event.id}`,
          id: event.id,
          text: (
            <div className={styles.orgrow}>
              <img src={event.icon.location} />
              <span>{event.name}</span>
            </div>
          ),
        })),
        offerCreateEvent &&
          events.length > 0 && {
            type: "divider",
          },
        offerCreateEvent && {
          type: "item",
          href: `/organization/${orgId}/event/new`,
          text: "Create a new event",
        },
      ].filter(Boolean)}
    />
  );
};
