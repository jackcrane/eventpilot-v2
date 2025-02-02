import { useParams } from "react-router-dom";
import { Page } from "../../../../../../components/page/Page";
import { sidenavItems } from "../../../../../../components/sidenav/Sidenav";
import { useEvent } from "../../../../../../hooks/useEvent";
import { TimeScaleLineChart } from "../../../../../../components/charts/TimeScaleLineChart";
import { Card, Typography } from "tabler-react-2";
import { Col, Row } from "../../../../../../util/Flex";
import { Icon } from "../../../../../../util/Icon";
import { CalendarDateDisplay } from "../../../../../../components/calendarDateDisplay/CalendarDateDisplay";
import { Button } from "tabler-react-2/dist/button";
const { Text, H4, H3 } = Typography;

const c = (num) => {
  return Number(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DataDisplay = ({
  fieldTitle,
  fieldValue,
  comparisonValue,
  prefix = "",
}) => {
  const percentChange =
    ((fieldValue - comparisonValue) / comparisonValue) * 100;

  return (
    <div
      style={{
        backgroundColor: "var(--tblr-gray-50)",
        borderRadius: 8,
        padding: 8,
        minWidth: 150,
      }}
    >
      <Col align="flex-start">
        <H4 className="mb-0">{fieldTitle}</H4>
        <Text
          className="mb-0"
          style={{ fontSize: 48, fontWeight: "bold", lineHeight: 0.8 }}
        >
          {prefix}
          {c(fieldValue)}
        </Text>
        <Row gap={1} className="mt-2">
          {fieldValue > comparisonValue && (
            <Row gap={0.5} align="center">
              <Icon i="arrow-up" className="text-success" size={18} />
              <Text className="text-success mb-0">
                {percentChange.toFixed(2)}%
              </Text>
              <Text className="text-secondary mb-0">{comparisonValue}</Text>
            </Row>
          )}
          {fieldValue < comparisonValue && (
            <Row gap={0.5} align="center">
              <Icon i="arrow-down" className="text-danger" size={18} />
              <Text className="text-danger mb-0">
                {percentChange.toFixed(2)}%
              </Text>
              <Text className="text-secondary mb-0">
                {prefix}
                {c(comparisonValue)}
              </Text>
            </Row>
          )}
        </Row>
      </Col>
    </div>
  );
};

const DeadlineItem = ({ month, day, title }) => (
  <Card size="sm" style={{ width: "100%" }}>
    <Row gap={2}>
      <CalendarDateDisplay month={month} day={day} />
      <div style={{ flex: 1 }}>
        <H3 className="mb-0">{title}</H3>
        <Row justify={"space-between"}>
          <Text style={{ margin: 0 }}>Tap here for more information</Text>
          <Button size="sm" outline variant="success">
            <Icon i="check" />
            Mark complete
          </Button>
        </Row>
      </div>
    </Row>
  </Card>
);

export const Event = () => {
  const { eventId, orgId } = useParams();
  const { event, loading } = useEvent({ orgId, eventId });

  return (
    <Page title={event.name} loading={loading} sidenavItems={sidenavItems("")}>
      <h1>{event.name}</h1>
      <Row gap={1} align="stretch" wrap>
        <Card title="Registrations" style={{ flex: 1, minWidth: 600 }}>
          <TimeScaleLineChart options={event.chartOptions} />
        </Card>
        <Card title="EYTD" style={{ flex: 1, minWidth: 400 }}>
          <Row wrap gap={2}>
            <DataDisplay
              fieldTitle="Registrations"
              fieldValue={12599}
              comparisonValue={12820}
            />
            <DataDisplay
              fieldTitle="Volunteers"
              fieldValue={155}
              comparisonValue={161}
            />
            <DataDisplay
              fieldTitle="Fundraising"
              fieldValue={103442}
              comparisonValue={97850}
              prefix="$"
            />
            <DataDisplay
              fieldTitle="Sponsors"
              fieldValue={74}
              comparisonValue={60}
            />
            <DataDisplay
              fieldTitle="New Email List Recipients"
              fieldValue={5341}
              comparisonValue={4331}
            />
          </Row>
        </Card>
        <Card title="Upcoming deadlines" style={{ flex: 1, minWidth: 400 }}>
          <Col gap={1} style={{ width: "100%" }}>
            <DeadlineItem
              month="May"
              day="11"
              title="Submit insurance information to liveries"
            />
            <DeadlineItem
              month="May"
              day="20"
              title="Follow-up on river closure with Coast Guard"
            />
            <DeadlineItem month="May" day="22" title="Send sponsorship email" />
            <DeadlineItem month="June" day="1" title="Email past volunteers" />
          </Col>
        </Card>
      </Row>
    </Page>
  );
};
