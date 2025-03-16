import styled from "styled-components";

const _UnsavedNotice = styled.div`
  // Black and yellow striped background 45 degree diagonal
  background: repeating-linear-gradient(
    45deg,
    #000,
    #000 10px,
    #ffff00 10px,
    #ffff00 20px
  );
  position: fixed;
  bottom: 100px;
  right: 0;
  top: 100px;
  z-index: 1000;
  padding: 2px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 2px solid #000;
  /* sideways text */
  writing-mode: vertical-rl;
`;

const _UnsavedNoticeInner = styled.div`
  background-color: #000;
  padding: 10px 2px;
  border-radius: 5px;
  display: inline-block;
  font-weight: bold;
`;

export const UnsavedNotice = ({ children }) => {
  return (
    <_UnsavedNotice>
      <_UnsavedNoticeInner>You have unsaved changes.</_UnsavedNoticeInner>
    </_UnsavedNotice>
  );
};
