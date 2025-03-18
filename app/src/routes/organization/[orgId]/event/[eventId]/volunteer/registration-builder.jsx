import React, { useState, useRef, useEffect } from "react";
import { Page } from "../../../../../../../components/page/Page";
import { sidenavItems } from "../../../../../../../components/sidenav/Sidenav";
import {
  Typography,
  Button,
  Modal,
  Input,
  Form,
  useConfirm,
  Switch,
  Util,
} from "tabler-react-2";
import { Sortable } from "../../../../../../../components/sortable/Sortable";
import { IconSelector } from "../../../../../../../components/iconSelector/IconSelector";
import { DataTypeSelector } from "../../../../../../../components/dataTypeSelector/DataTypeSelector";
import { Row } from "../../../../../../../util/Flex";
import { Icon } from "../../../../../../../util/Icon";
import { Spacer } from "../../../../../../../util/Spacer";
import { useEvent } from "../../../../../../../hooks/useEvent";
import { useParams } from "react-router-dom";
import { UnsavedNotice } from "../../../../../../../components/unsavedNotice/UnsavedNotice";
import { useVolunteerRegistrationFormFields } from "../../../../../../../hooks/useVolunteerRegistrationFormFields";
const { Text, H3 } = Typography;

const InputTypeStringConfigItem = ({
  setRegistrationFields,
  item,
  confirm,
}) => {
  const updateField = (field, value) => {
    setRegistrationFields((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i))
    );
  };

  return (
    <div style={{ flex: 1 }}>
      <Row justify="space-between" align="center">
        <b>Text</b>
        <Button
          size="sm"
          variant="danger"
          outline
          onClick={async () => {
            if (await confirm())
              setRegistrationFields((prev) =>
                prev.filter((i) => i.id !== item.id)
              );
          }}
          style={{
            lineHeight: 1,
          }}
        >
          Delete
        </Button>
      </Row>
      <Text className="text-secondary">
        A string input field. The user will be able to enter a single line of
        text.
      </Text>
      <Row gap={1}>
        <Input
          label="Enter a label for this field"
          placeholder="This will appear above the field & show in dashboards"
          value={item.label}
          onInput={(value) => updateField("label", value)}
          style={{ flex: 1 }}
        />
        <div class="mb-3">
          <label className="form-label">Icon</label>
          <IconSelector
            value={item.icon}
            onChange={(value) => updateField("icon", value)}
          />
        </div>
      </Row>
      <Input
        label="Enter a hint for this field"
        placeholder="This will appear in the field"
        value={item.hint}
        onInput={(value) => updateField("hint", value)}
      />
      <Input
        label="Enter a description for this field"
        placeholder="Provide more information about this field"
        value={item.description}
        onInput={(value) => updateField("description", value)}
      />
      <Switch
        label="Required"
        checked={item.required}
        onChange={(value) => updateField("required", value)}
      />
    </div>
  );
};

const InputTypeTextConfigItem = ({ setRegistrationFields, item, confirm }) => {
  const updateField = (field, value) => {
    setRegistrationFields((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i))
    );
  };

  return (
    <div style={{ flex: 1 }}>
      <Row justify="space-between" align="center">
        <b>Non-Input Display</b>
        <Button
          size="sm"
          variant="danger"
          outline
          onClick={async () => {
            if (await confirm())
              setRegistrationFields((prev) =>
                prev.filter((i) => i.id !== item.id)
              );
          }}
          style={{
            lineHeight: 1,
          }}
        >
          Delete
        </Button>
      </Row>
      <Text className="text-secondary">
        A block that does not accept input, but can display text.
      </Text>
      <Row gap={1}>
        <Input
          label="Enter a label for this field"
          placeholder="This will appear above the field & show in dashboards"
          value={item.label}
          onInput={(value) => updateField("label", value)}
          style={{ flex: 1 }}
        />
        <div class="mb-3">
          <label className="form-label">Icon</label>
          <IconSelector
            value={item.icon}
            onChange={(value) => updateField("icon", value)}
          />
        </div>
      </Row>
      <Form.Autosize
        style={{
          width: "100%",
        }}
        title="Enter the content of this block"
        placeholder="Your content here"
        value={item.description}
        onInput={(value) => updateField("description", value.target.value)}
      />
    </div>
  );
};

const InputTypeNumberConfigItem = ({
  setRegistrationFields,
  item,
  confirm,
}) => {
  const updateField = (field, value) => {
    setRegistrationFields((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i))
    );
  };

  return (
    <div style={{ flex: 1 }}>
      <Row justify="space-between" align="center">
        <b>Number</b>
        <Button
          size="sm"
          variant="danger"
          outline
          onClick={async () => {
            if (await confirm())
              setRegistrationFields((prev) =>
                prev.filter((i) => i.id !== item.id)
              );
          }}
          style={{
            lineHeight: 1,
          }}
        >
          Delete
        </Button>
      </Row>
      <Text className="text-secondary">
        A number input field. The user will be able to enter a single line of
        text.
      </Text>
      <Row gap={1}>
        <Input
          label="Enter a label for this field"
          placeholder="This will appear above the field & show in dashboards"
          value={item.label}
          onInput={(value) => updateField("label", value)}
          style={{ flex: 1 }}
        />
        <div class="mb-3">
          <label className="form-label">Icon</label>
          <IconSelector
            value={item.icon}
            onChange={(value) => updateField("icon", value)}
          />
        </div>
      </Row>
      <Input
        label="Enter a hint for this field"
        placeholder="This will appear in the field"
        value={item.hint}
        onInput={(value) => updateField("hint", value)}
      />
      <Input
        label="Enter a description for this field"
        placeholder="Provide more information about this field"
        value={item.description}
        onInput={(value) => updateField("description", value)}
      />
      <Row gap={1}>
        <Input
          type="number"
          label="Minimum value"
          placeholder="-∞"
          value={item.min}
          onInput={(value) => updateField("min", value)}
          style={{ flex: 1 }}
        />
        <Input
          type="number"
          label="Maximum value"
          placeholder="∞"
          value={item.max}
          onInput={(value) => updateField("max", value)}
          style={{ flex: 1 }}
        />
      </Row>
    </div>
  );
};

const InputTypeEmailConfigItem = ({ setRegistrationFields, item, confirm }) => {
  const updateField = (field, value) => {
    setRegistrationFields((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i))
    );
  };

  return (
    <div style={{ flex: 1 }}>
      <Row justify="space-between" align="center">
        <b>Email</b>
        <Button
          size="sm"
          variant="danger"
          outline
          onClick={async () => {
            if (await confirm())
              setRegistrationFields((prev) =>
                prev.filter((i) => i.id !== item.id)
              );
          }}
          style={{
            lineHeight: 1,
          }}
        >
          Delete
        </Button>
      </Row>
      <Text className="text-secondary">
        An email input field. The user will be able to enter an email address.
      </Text>
      <Row gap={1}>
        <Input
          label="Enter a label for this field"
          placeholder="This will appear above the field & show in dashboards"
          value={item.label}
          onInput={(value) => updateField("label", value)}
          style={{ flex: 1 }}
        />
        <div class="mb-3">
          <label className="form-label">Icon</label>
          <IconSelector
            value={item.icon}
            onChange={(value) => updateField("icon", value)}
          />
        </div>
      </Row>
      <Input
        label="Enter a hint for this field"
        placeholder="This will appear in the field"
        value={item.hint}
        onInput={(value) => updateField("hint", value)}
      />
      <Input
        label="Enter a description for this field"
        placeholder="Provide more information about this field"
        value={item.description}
        onInput={(value) => updateField("description", value)}
      />
    </div>
  );
};

const InputTypeDropdownConfigItem = ({
  setRegistrationFields,
  item,
  confirm,
}) => {
  const updateField = (field, value) => {
    setRegistrationFields((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i))
    );
  };

  return (
    <div style={{ flex: 1 }}>
      <Row justify="space-between" align="center">
        <b>Dropdown</b>
        <Button
          size="sm"
          variant="danger"
          outline
          onClick={async () => {
            if (await confirm())
              setRegistrationFields((prev) =>
                prev.filter((i) => i.id !== item.id)
              );
          }}
          style={{
            lineHeight: 1,
          }}
        >
          Delete
        </Button>
      </Row>
      <Text className="text-secondary">
        A dropdown input field. The user will be able to select from a list of
        options.
      </Text>
      <Row gap={1}>
        <Input
          label="Enter a label for this field"
          placeholder="This will appear above the field & show in dashboards"
          value={item.label}
          onInput={(value) => updateField("label", value)}
          style={{ flex: 1 }}
        />
        <div class="mb-3">
          <label className="form-label">Icon</label>
          <IconSelector
            value={item.icon}
            onChange={(value) => updateField("icon", value)}
          />
        </div>
      </Row>
      <H3>Options</H3>
      {(item.options || []).map((option, index) => (
        <Row key={index} gap={1} align="flex-end" className="mb-3">
          <Input
            label="Enter a label for this option"
            placeholder="This will appear above the field & show in dashboards"
            value={option.label}
            onInput={(value) => updateField("options", index, "label", value)}
            style={{ flex: 1 }}
            className="mb-0"
          />
          <Button
            variant="danger"
            outline
            onClick={() =>
              setRegistrationFields((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? {
                        ...i,
                        options: i.options.filter(
                          (o, index) => index !== index
                        ),
                      }
                    : i
                )
              )
            }
          >
            <Icon i="trash" />
          </Button>
        </Row>
      ))}
      <Button
        onClick={() =>
          setRegistrationFields((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    options: [
                      ...(i.options || []),
                      {
                        label: "",
                      },
                    ],
                  }
                : i
            )
          )
        }
        style={{ width: "100%" }}
      >
        Add Option
      </Button>
    </div>
  );
};

const INPUT_MAP = {
  string: InputTypeStringConfigItem,
  text: InputTypeTextConfigItem,
  number: InputTypeNumberConfigItem,
  email: InputTypeEmailConfigItem,
  dropdown: InputTypeDropdownConfigItem,
};

export const RegistrationInputBuilder = ({ onFinish }) => {
  const [type, setInternalType] = useState({ value: "string" });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [type]);

  return (
    <>
      <DataTypeSelector value={type} onChange={setInternalType} />
      <Button
        ref={buttonRef}
        onClick={() => onFinish?.(type)}
        style={{ width: "100%" }}
        className="mt-2"
        variant="primary"
      >
        Add Field
      </Button>
    </>
  );
};

export const RegistrationBuilder = () => {
  const { orgId, eventId } = useParams();
  const {
    registrationFields: serverRegistrationFields,
    loading: loadingServerRegistrationFields,
    update,
  } = useVolunteerRegistrationFormFields({
    orgId,
    eventId,
  });
  const [registrationFields, setRegistrationFields] = useState([]);
  useEffect(() => {
    if (serverRegistrationFields) {
      setRegistrationFields(serverRegistrationFields);
    }
  }, [serverRegistrationFields]);

  const [inputModalOpen, setInputModalOpen] = useState(false);

  const { confirm, ConfirmModal } = useConfirm({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    commitText: "Yes",
    cancelText: "No",
  });

  const { event, loading } = useEvent({
    orgId,
    eventId,
  });
  const [openWindow, setOpenWindow] = useState(null);

  useEffect(() => {
    if (openWindow) {
      openWindow.postMessage(
        JSON.stringify({ __eventpilotRegistrationFields: registrationFields }),
        "*"
      );
    }
  }, [openWindow, registrationFields]);

  return (
    <Page
      title="Registration Builder"
      sidenavItems={sidenavItems("volunteer-registration-builder")}
    >
      {ConfirmModal}
      <h1>Volunteer Registration Builder</h1>
      <Text>
        Your event is unique, and we want to make sure you can get the
        information you need in order to make the best experience for your
        volunteers.
      </Text>
      <Text>
        We automatically collect the user's name and email address, but beyond
        that you can collect any additional information you need.
      </Text>
      <Row gap={1}>
        <Button
          onClick={async () => {
            let w = window.open(
              event.hostedUrl + "/volunteer",
              "_blank",
              "width=600,height=400"
            );
            setOpenWindow(w);
            await new Promise((resolve) => setTimeout(resolve, 100));
            w.postMessage(
              JSON.stringify({
                __eventpilotRegistrationFields: registrationFields,
              }),
              "*"
            );
          }}
        >
          Open preview registration window
        </Button>
      </Row>
      <Spacer />
      <Sortable
        items={registrationFields
          .filter((item) => !item.system_set)
          .map((item) => ({
            ...item,
            style: {
              borderColor: item.id.includes("_") ? "var(--tblr-warning)" : null,
            },
            unsaved: item.id.includes("_"),
            content: INPUT_MAP[item.type?.toLowerCase()]?.({
              setRegistrationFields,
              item,
              confirm,
            }) || <div>Unknown input type {JSON.stringify(item)}</div>,
          }))}
        onChange={setRegistrationFields}
        lockedItems={[
          {
            content: (
              <div>
                <b>Name</b>
                <Text className="text-secondary mb-0">
                  We automatically collect the user's name and email address.
                </Text>
              </div>
            ),
          },
          {
            content: (
              <div>
                <b>Email</b>
                <Text className="text-secondary mb-0">
                  We automatically collect the user's name and email address.
                </Text>
              </div>
            ),
          },
        ]}
      />
      <Button style={{ width: "100%" }} onClick={() => setInputModalOpen(true)}>
        Add Field
      </Button>
      <Util.Spacer size={1} />
      <Button
        style={{ width: "100%" }}
        onClick={() => update(registrationFields)}
        variant="primary"
        loading={loadingServerRegistrationFields}
      >
        Save your work
      </Button>
      <Modal
        title="Add Field"
        open={inputModalOpen}
        onClose={() => setInputModalOpen(false)}
        modalBodyStyle={{
          overflow: "auto",
        }}
      >
        <RegistrationInputBuilder
          onFinish={(type) => {
            setRegistrationFields((prev) => [
              ...prev,
              {
                sortIndex: prev.length + 1,
                id: "_" + (prev.length + 1),
                type: `${type.value}`,
              },
            ]);
            setInputModalOpen(false);
          }}
        />
      </Modal>
    </Page>
  );
};
