import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
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
import { useQuery } from "react-apollo-hooks";
import { ME_QUERY } from "../SharedQuries";

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
  padding: 11px 0px;
`;

const HeaderColum = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin: auto;
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
  outline: none;
  &:focus {
    &::placeholder {
      text-align: start;
    }
  }
  &:required {
    /* Firefox prevent red box-shadow  */
    box-shadow: none;
  }
  &::placeholder {
    opacity: 0.45;
    font-weight: 500;
    font-size: 13px;
    text-align: center;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const {
    data: { me },
  } = useQuery(ME_QUERY);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColum>
          <Link to="/">
            <InstaIcon />
          </Link>
        </HeaderColum>
        <HeaderColum>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="🔍검색"
            />
          </form>
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
          {!me ? (
            <HeaderLink to="/#">
              <PersonIcon />
            </HeaderLink>
          ) : (
            <HeaderLink to={`/profile/${me.username}`}>
              <PersonIcon />
            </HeaderLink>
          )}
        </HeaderColum>
      </HeaderWrapper>
    </Header>
  );
});
