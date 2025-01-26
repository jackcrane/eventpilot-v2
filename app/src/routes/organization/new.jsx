import React, { useState } from "react";
import { Page } from "../../../components/page/Page";
import { sidenavItems } from "../../../components/sidenav/Sidenav";
import { Typography, Input, Button, Form, Util, Alert } from "tabler-react-2";
import { useAuth } from "../../../hooks";
import { Row } from "../../../util/Flex";
import { useOrganizations } from "../../../hooks/useOrganizations";
const { H1, H3, Text } = Typography;
import { Dropzone } from "../../../components/dropzone/Dropzone";
import { useNavigate } from "react-router-dom";

export const NewOrganization = () => {
  const { user } = useAuth();
  const [newOrg, setNewOrg] = useState({});

  const navigate = useNavigate();

  const { mutationLoading, mutationError, createOrganization } =
    useOrganizations();

  const errorIncludes = (path) => {
    const error = mutationError?.raw?.error || {};
    if (!error || !error.issues) return false;
    return error.issues.some((issue) => issue.path.includes(path));
  };
  window.errorIncludes = errorIncludes;

  return (
    <Page title="Home" sidenavItems={sidenavItems("")}>
      <H1>Create a new organization</H1>
      <Text>
        Create a new organization to manage everything related to your
        organization. You can change all of this information later, but it may
        affect the visibility of your organization if you do.
      </Text>
      {mutationError && (
        <Alert title="Unable to create organization" variant="danger">
          {mutationError.message}
        </Alert>
      )}

      <H3>
        Organization Name<span className="text-danger">*</span>
      </H3>
      <Input
        placeholder="Organization Name"
        className="mb-1"
        onInput={(value) => setNewOrg({ ...newOrg, name: value })}
        value={newOrg.name}
        variant={errorIncludes("name") ? "danger" : "default"}
      />
      <Text className="mb-2">
        This is the name of your organization that will be displayed to the
        public. It will be on your public profile, any events you create,
        public-facing marketing content, and communcations through our platform.
      </Text>
      <Text>
        If you go by a different name than your legal name, you can enter the
        one that you want to be known by here.
      </Text>

      <H3>Organization Icon</H3>
      <Dropzone
        onSuccessfulUpload={({ id }) => setNewOrg({ ...newOrg, iconId: id })}
        mb={"mb-1"}
      />
      <Text>
        This is the icon that will be displayed on your public profile and any
        events you create. This will also be used in any marketing content that
        you create, and in autogenerated communications with your event
        contacts.
      </Text>

      <H3>Organization Public Contact Email</H3>
      <Input
        placeholder="Organization Public Contact Email"
        className="mb-1"
        onInput={(value) => setNewOrg({ ...newOrg, email: value })}
        value={newOrg.email}
        variant={errorIncludes("email") ? "danger" : "default"}
      />
      <Text className="mb-2">
        This is the email address that the public can use to contact your
        organization. This will be displayed on your public profile and any
        events you create. This will also be used in any marketing content that
        you create, and in autogenerated communications with your event
        contacts. We will direct your event contacts to this email address if
        they have questions or need to reach out to you regarding anything about
        the event.
      </Text>
      <Text>
        You can choose to leave this blank and we will autofill it with the
        email associated with your account (<i>{user.email}</i>).
      </Text>

      <H3>Organization Private Contact Email</H3>
      <Input
        placeholder="Organization Private Contact Email"
        className="mb-1"
        onInput={(value) => setNewOrg({ ...newOrg, privateEmail: value })}
        value={newOrg.privateEmail}
        variant={errorIncludes("privateEmail") ? "danger" : "default"}
      />
      <Text className="mb-2">
        This is the email address that EventPilot will use to contact you. We
        will not display this email address to the public, and we will not
        provide it to event contacts. This email address will be used for
        account verification, password resets, and other administrative
        communications, as well as communications from our team.
      </Text>
      <Text className="mb-2">
        It is important that you provide an email address that you check
        regularly, as we will use this email address to communicate with you
        about important updates, changes, and other information about your
        events.
      </Text>
      <Text>
        We will not use this email address for marketing purposes, and we will
        not provide it to third parties.
      </Text>

      <H3>Organization Website</H3>
      <Input
        placeholder="Organization Website"
        className="mb-1"
        value={newOrg.website}
        variant={errorIncludes("website") ? "danger" : "default"}
        onInput={(value) => setNewOrg({ ...newOrg, website: value })}
      />
      <Text className="mb-2">
        If you have a website for your organization, you can enter it here. This
        will be displayed and linked on your public profile and any events you
        create. This will also be used in any marketing content that you create,
        and in autogenerated communications with your event contacts.
      </Text>
      <Text>
        You can change this later, but public visibility of existing content may
        be affected if you do not configure forwarding or redirection. We will
        provide you with resources and best practices if you ever decide to edit
        your website URL.
      </Text>

      <H3>Organization Address</H3>
      <Form.Autosize
        placeholder="1234 Main St&#10;Suite 1310&#10;Anytown, USA"
        rows={3}
        value={newOrg.address}
        onInput={(value) =>
          setNewOrg({ ...newOrg, address: value.target.value })
        }
        variant={errorIncludes("address") ? "danger" : "default"}
      />
      <Util.Spacer size={1} />
      <Text className="mb-2">
        This is the address of your organization. It will be displayed on your
        public profile and included in the footers of emails and webpages that
        you create.
      </Text>

      <Util.Spacer size={2} />
      {mutationError && (
        <Alert title="Unable to create organization" variant="danger">
          {mutationError.message}
        </Alert>
      )}
      <Util.Spacer size={2} />

      <Row justify="flex-end" gap={2}>
        <Button
          variant="primary"
          onClick={() =>
            createOrganization(newOrg, (id) => {
              if (id) {
                navigate(`/organizations/${id}`);
              }
            })
          }
          loading={mutationLoading}
        >
          Create Organization
        </Button>
      </Row>
    </Page>
  );
};
