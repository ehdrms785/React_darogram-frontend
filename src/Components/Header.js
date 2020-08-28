import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useInput from "../Hooks/useInput";
import Input from "./Input";
import {
  HomeIcon,
  PaperPlaneIcon,
  InstaIcon,
  HeartEmptyIcon,
  CompassIcon,
  PersonIcon,
} from "./Icons";

const Header = styled.header`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  border: 0;
  border-radius: 0px;
  border-bottom: ${(props) => props.theme.boxBorder};
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
`;

const HeaderColum = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  width: 70%;
  height: auto;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
export default () => {
  const search = useInput("");

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColum>
          <Link to="/">
            <InstaIcon />
          </Link>
        </HeaderColum>
        <HeaderColum>
          <SearchInput {...search} placeholder="검색" />
        </HeaderColum>
        <HeaderColum>
          <HeaderLink to="/">
            <HomeIcon />
          </HeaderLink>
          <HeaderLink to="/directMessage">
            <PaperPlaneIcon />
          </HeaderLink>
          <HeaderLink to="/explore">
            <CompassIcon />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmptyIcon />
          </HeaderLink>
          <HeaderLink to="/username">
            <PersonIcon />
          </HeaderLink>
        </HeaderColum>
      </HeaderWrapper>
    </Header>
  );
};
