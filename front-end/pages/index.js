import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 30px;
  color: darkgreen;
  font-weight: 600;
`;

function index() {
  return (
    <div>
      index페이지임
      <Title>안녕 스타일컴포넌트</Title>
    </div>
  );
}

export default index;
