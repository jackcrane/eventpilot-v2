import * as Plot from "@observablehq/plot";
import { ChartHost } from "./ChartHost.jsx";

const generateMockRegistrations = () => {
  const startDate = new Date("2023-06-01");
  const endDate = new Date("2024-05-30");
  const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  // Updated equation function
  const registrationCurve = (x) => {
    return (
      6026.426 +
      (1.163688e-13 - 6026.426) / (1 + Math.pow(x / 45.84144, 6.955488))
    );
  };

  // Scale x values to fit within the updated domain [0, 100]
  const xValuesScaled = Array.from(
    { length: numDays },
    (_, i) => (i / numDays) * 100
  );

  // Apply the updated equation to get the base values
  let registrants = xValuesScaled.map(registrationCurve);

  // Add randomness while ensuring non-decreasing values
  let randomIncrement = 0;
  registrants = registrants.map((val) => {
    randomIncrement += Math.floor(Math.random() * 50) + 1;
    return Math.max(val + randomIncrement, 0);
  });

  // Introduce a few jumps in the data
  const jumpIndices = [
    Math.floor(numDays * 0.25),
    Math.floor(numDays * 0.5),
    Math.floor(numDays * 0.75),
  ];
  const jumpValues = [300, 500, 700];

  jumpIndices.forEach((index, i) => {
    for (let j = index; j < numDays; j++) {
      registrants[j] += jumpValues[i];
    }
  });

  // Ensure non-decreasing values after jumps
  for (let i = 1; i < registrants.length; i++) {
    registrants[i] = Math.max(registrants[i], registrants[i - 1]);
  }

  // Generate date-wise JSON data
  const data = [];
  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    data.push({
      date: currentDate.toISOString().split("T")[0],
      registrants: Math.round(registrants[i]),
    });
  }

  return data;
};

const generateMockRegistrationsNew = () => {
  const startDate = new Date("2024-06-01");
  const endDate = new Date("2025-01-27");
  const totalDays =
    Math.ceil((new Date("2025-06-30") - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const cutoffDays =
    Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const maxRegistrants = 6000;

  // Updated equation function
  const registrationCurve = (x) => {
    return (
      6048.187 +
      (-1.277218e-13 - 6048.187) / (1 + Math.pow(x / 42.0533, 5.569442))
    );
  };

  // Scale x values to fit within the domain [0, 100] for the full range
  const xValuesScaled = Array.from(
    { length: totalDays },
    (_, i) => (i / totalDays) * 100
  );

  // Apply the updated equation to get the base values
  let registrants = xValuesScaled.map(registrationCurve);

  // Add randomness while ensuring non-decreasing values
  let randomIncrement = 0;
  registrants = registrants.map((val) => {
    randomIncrement += Math.floor(Math.random() * 50) + 1;
    return Math.max(val + randomIncrement, 0);
  });

  // Introduce the same jump indices at 25%, 50%, and 75% of the original range
  const jumpIndices = [
    Math.floor(totalDays * 0.25),
    Math.floor(totalDays * 0.5),
    Math.floor(totalDays * 0.75),
  ];
  const jumpValues = [300, 500, 700];

  jumpIndices.forEach((index, i) => {
    for (let j = index; j < totalDays; j++) {
      registrants[j] += jumpValues[i];
    }
  });

  // Ensure non-decreasing values after jumps
  for (let i = 1; i < registrants.length; i++) {
    registrants[i] = Math.max(registrants[i], registrants[i - 1]);
  }

  // Generate date-wise JSON data, cut off at the specified date
  const data = [];
  for (let i = 0; i < cutoffDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    data.push({
      date: currentDate.toISOString().split("T")[0],
      registrants: Math.round(registrants[i]),
    });
  }

  return data;
};

export const TimeScaleLineChart = ({ options }) => {
  const parsedRegistrations = generateMockRegistrations().map(
    (item, index) => ({
      ...item,
      index,
      originalDate: new Date(item.date),
      date: new Date(
        new Date(item.date).setFullYear(new Date(item.date).getFullYear() + 1)
      ),
    })
  );

  const parsedRegistrationsNew = generateMockRegistrationsNew().map(
    (item, index) => ({
      ...item,
      index,
      date: new Date(item.date),
    })
  );

  return (
    <div>
      <ChartHost
        options={{
          height: 300,
          width: 500,
          y: { grid: false },
          x: {
            domain: [
              parsedRegistrations[0].date,
              parsedRegistrations[parsedRegistrations.length - 1].date,
            ],
          },
          marks: [
            Plot.axisX({
              grid: false,
              label: "",
              tickSize: 2,
              dx: 4,
            }),
            Plot.axisY({
              grid: false,
              label: "",
              tickSize: 0,
              dx: 4,
            }),
            Plot.ruleY([0]),

            Plot.line(parsedRegistrations, {
              // Convert to date
              x: "date",
              y: "registrants",
              stroke: "#919191",
            }),
            Plot.line(parsedRegistrationsNew, {
              // Convert to date
              x: "date",
              y: "registrants",
              stroke: "var(--tblr-primary)",
            }),

            Plot.line(parsedRegistrations, {
              // Convert to date
              x: "date",
              y: "registrants",
              stroke: "#919191",
              dy: 5,
              imageFilter: "blur(4px)",
            }),
            Plot.line(parsedRegistrationsNew, {
              // Convert to date
              x: "date",
              y: "registrants",
              stroke: "var(--tblr-primary)",
              dy: 5,
              imageFilter: "blur(4px)",
            }),

            Plot.areaY(parsedRegistrationsNew, {
              // Convert to date
              x: "date",
              y: "registrants",
              fill: "var(--tblr-primary)",
              fillOpacity: 0.05,
            }),
            Plot.ruleX(
              parsedRegistrations,
              Plot.pointerX({
                x: "date",
                stroke: "#919191",
              })
            ),
            Plot.dot(
              parsedRegistrations,
              Plot.pointerX({
                x: "date",
                y: "registrants",
                stroke: "#919191",
                r: 5,
              })
            ),
            Plot.dot(
              parsedRegistrationsNew,
              Plot.pointerX({
                x: "date",
                y: "registrants",
                stroke: "var(--tblr-primary)",
                r: 5,
              })
            ),
            Plot.gridY({
              strokeDasharray: "2,35",
              stroke: "#000000",
              strokeOpacity: 0.2,
              strokeWidth: 2,
            }),
            Plot.text(
              parsedRegistrations,
              Plot.pointerX({
                px: "date",
                py: "registrants",
                dy: -17,
                frameAnchor: "top-left",
                fontVariant: "tabular-nums",
                text: (d) =>
                  [
                    `${d.date.toLocaleString(undefined, {
                      day: "numeric",
                      month: "long",
                    })}`,

                    `This year ${
                      parsedRegistrationsNew[d.index - 1]?.registrants ||
                      "(no data)"
                    }`,

                    `Last year ${
                      parsedRegistrations[d.index - 1]?.registrants ||
                      "(no data)"
                    }`,
                  ].join("   "),
              })
            ),
            Plot.text(
              parsedRegistrations,
              Plot.selectLast({
                x: "date",
                y: "registrants",
                text: "Last year",
                textAnchor: "start",
                dx: 3,
              })
            ),
          ],
        }}
      />
      <p>
        This graph shows the number of registrants over time for your event{" "}
        <span className="text-primary">this year (blue) </span> and{" "}
        <span className="text-secondary">last year (gray)</span> (if
        applicable).
      </p>
    </div>
  );
};
