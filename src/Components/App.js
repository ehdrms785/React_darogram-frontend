import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import { HashRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import Theme from "../Styles/Theme";
import Routes from "./Router";
import { useQuery } from "react-apollo-hooks";
import Footer from "./Footer";
import Header from "./Header";

// @client 를 하지 않으면 API로 요청을 보낼 것임
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;
export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);
  console.log(isLoggedIn);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />

        <Router>
          <>
            <Header />
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
