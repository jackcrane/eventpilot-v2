import React, { useEffect } from "react";
import { Input, Button, Alert, Card, Util } from "tabler-react-2";
import { useState } from "react";
import { Col, Row } from "../../util/Flex";
import { useFileUploader } from "../../hooks/useFileUploader";
import { Icon } from "../../util/Icon";

export const Dropzone = ({ onSuccessfulUpload, mb = "mb-3" }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    console.log(files);
  }, [files]);

  const [data, setData] = useState(null);

  const {
    data: _data,
    error,
    loading,
    upload,
  } = useFileUploader("/api/file", {
    onSuccessfulUpload: (d) => onSuccessfulUpload(d),
  });

  useEffect(() => {
    setData(_data);
  }, [_data]);

  if (data?.originalName) {
    return (
      <Card className="mb-3">
        <Row justify="space-between" align="center">
          <img
            src={data.url}
            style={{
              maxWidth: 100,
              maxHeight: 100,
            }}
          />
          <Col align="flex-end">
            <b>{data.originalName}</b>
            <div className="text-muted">
              <span>{data.size}</span>
            </div>
            <Util.Spacer size={2} />
            <Button
              onClick={() => {
                setData(null);
                setFiles([]);
              }}
              className="mb-0"
            >
              <Icon i="trash" />
              <span className="ml-1">Delete</span>
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }

  return (
    <>
      {error && (
        <Alert variant="danger" className="mb-3" title="Error">
          {error}
        </Alert>
      )}
      <Row gap={1}>
        <Input
          style={{ flex: 1 }}
          type="file"
          name="file"
          inputProps={{
            multiple: false,
          }}
          onRawChange={(e) => {
            setFiles(e.target.files);
          }}
          className="mb-0"
        />
        {files.length > 0 && (
          <Button
            onClick={() => {
              upload(files);
            }}
            className="mb-0"
            loading={loading}
            disabled={data?.originalName === files[0]?.name}
          >
            {data?.originalName === files[0].name ? (
              <Icon
                i="circle-check"
                style={{
                  color: "inherit",
                  transform: "scale(1.4)",
                }}
              />
            ) : (
              "Upload"
            )}
          </Button>
        )}
      </Row>
      {files.length > 0 && data?.originalName !== files[0]?.name && (
        <span className="text-danger">
          Your file is not uploaded yet. Please click the upload button to
          complete.
        </span>
      )}
      <div className={mb} />
    </>
  );
};
