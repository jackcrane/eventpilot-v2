import { EnclosedSelectGroup, Typography } from "tabler-react-2";
const { Text } = Typography;

export const DataTypeSelector = ({ value, onChange }) => {
  return (
    <EnclosedSelectGroup
      value={value}
      onChange={onChange}
      direction="column"
      itemClassName="flex-fill"
      items={[
        {
          value: "text",
          content: (
            <div>
              <b>Non-input</b>
              <Text className="mb-0">
                An ability to write and display text without any input, usfeul
                for displaying descriptions and feedback.
              </Text>
            </div>
          ),
        },
        {
          value: "string",
          content: (
            <div>
              <b>Text</b>
              <Text className="mb-0">A basic text input for short answers</Text>
            </div>
          ),
        },
        {
          value: "number",
          content: (
            <div>
              <b>Number</b>
              <Text className="mb-0">
                A basic numeric input that allows integers and decimals
              </Text>
            </div>
          ),
        },
        {
          value: "datetime",
          content: (
            <div>
              <b>Datetime</b>
              <Text className="mb-0">
                A basic datetime input that allows users to select a date and
                time.
              </Text>
            </div>
          ),
        },
        {
          value: "email",
          content: (
            <div>
              <b>Email</b>
              <Text className="mb-0">
                A basic email input that validates email addresses.{" "}
                <i>
                  Note that you do not need to collect your user's email
                  address, it will be collected automatically.
                </i>
              </Text>
            </div>
          ),
        },
        {
          value: "select",
          content: (
            <div>
              <b>Select</b>
              <Text className="mb-0">
                Allow your users to select from a list of options. It will look
                like this field form.
              </Text>
            </div>
          ),
        },
        {
          value: "dropdown",
          content: (
            <div>
              <b>Dropdown</b>
              <Text className="mb-0">
                Allow your users to select from a long, searchable list of
                options.
              </Text>
            </div>
          ),
        },
        {
          value: "boolean",
          content: (
            <div>
              <b>Yes/No</b>
              <Text className="mb-0">
                Allow your users to select a yes or no option.
              </Text>
            </div>
          ),
        },
      ]}
      style={{ width: "100%" }}
      itemStyle={{ marginRight: 0 }}
    />
  );
};
