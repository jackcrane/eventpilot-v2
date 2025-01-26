import { Breadcrumb, Typography, Spinner } from "tabler-react-2";
import { useLocation, useParams } from "react-router-dom";
import { useOrganization } from "../../hooks/useOrganization";
import { useEvent } from "../../hooks/useEvent";
import { useState, useEffect } from "react";
const { Link } = Typography;

export const Breadcrumbs = () => {
  const location = useLocation();
  const { orgId, eventId } = useParams();
  const { organization, loading: orgLoading } = useOrganization({ id: orgId });
  const { event, loading: eventLoading } = useEvent({ orgId, eventId });

  const [pathMappings, setPathMappings] = useState({
    settings: "Settings",
    me: "Profile",
    home: "Home",
    organization: "Organization",
    "knowledge-base": "Knowledge Base",
    event: "Event",
  });

  useEffect(() => {
    if (organization.name && organization.id) {
      setPathMappings((prevMappings) => ({
        ...prevMappings,
        [organization.id]: organization.name,
      }));
    }
  }, [organization.name, organization.id]);

  useEffect(() => {
    if (event.name && event.id) {
      setPathMappings((prevMappings) => ({
        ...prevMappings,
        [event.id]: event.name,
      }));
    }
  }, [event.name, event.id]);

  const switchPathPieceForDisplay = (pathPiece) =>
    pathMappings[pathPiece] || <Spinner size="sm" />;

  const path = location.pathname.split("/");
  const paths = path.filter((p) => p !== "");
  paths.unshift("home");

  // if (orgLoading || eventLoading) return <Spinner size="sm" />;

  return (
    <Breadcrumb>
      {paths.map((path, index) => (
        <Breadcrumb.Item key={index}>
          {index === paths.length - 1 ? (
            <span>{switchPathPieceForDisplay(path)}</span>
          ) : (
            <Link href={`/${path}`}>{switchPathPieceForDisplay(path)}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
