import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
export default ({
  action,
  setAction,
  username,
  //   password,
  firstName,
  lastName,
  email,
  secret,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
            <title>Log In | Prismagram</title>
          </Helmet>

          <form onSubmit={onSubmit}>
            <Input placeholder={"E-mail"} {...email} type="email"></Input>
            {/* <Input placeholder={"Password"} {...password} type="password"></Input> */}
            <Button text={"로그인"} />
          </form>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
            <title>Sign Up | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={"First Name"}
              value={firstName.value}
              onChange={firstName.onChange}
            ></Input>
            <Input
              placeholder={"Last Name"}
              value={lastName.value}
              onChange={lastName.onChange}
            ></Input>
            <Input
              placeholder={"E-mail"}
              value={email.value}
              onChange={email.onChange}
              type="email"
            ></Input>
            <Input
              placeholder={"User Name"}
              value={username.value}
              onChange={username.onChange}
            ></Input>
            {/* <Input placeholder={"Password"} {...password} type="password"></Input> */}
            <Button text={"가입하기"} />
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>Confirm Secret | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={"Paste your secret"}
              required
              {...secret}
            ></Input>
            <Button text={"Confirm"} />
          </form>
        </>
      )}
    </Form>

    {action !== "confirm" && (
      <StateChanger>
        {action === "logIn" ? (
          <>
            계정이 없으신가요?
            <Link onClick={() => setAction("signUp")}>가입하기</Link>
          </>
        ) : (
          <>
            계정이 있으신가요?
            <Link onClick={() => setAction("logIn")}>로그인</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
