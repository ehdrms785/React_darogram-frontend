//Container

import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

export default () => {
  console.log(localStorage.getItem("action"));

  const history = useHistory();
  const location = useLocation();
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  //   const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");

  const requestSecretMutation = useMutation(LOG_IN, {
    variables: {
      email: email.value,
    },
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: secret.value,
      email: email.value,
    },
  });
  const localLogInMutation = useMutation(LOCAL_LOG_IN);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("🦄 You don't have an account yet, create one", {
              //   position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              setAction("signUp");
            });
          } else {
            toast.success("Check your inbox for your login secret");
            setTimeout(() => {
              setAction("confirm");
            });
          }
        } catch {
          toast.error("Can't requestSecret, try again");
        }
      } else {
        toast.error("Email is required", { autoClose: 3000 });
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          console.log(createAccount);
          if (!createAccount) {
            toast.error("Can't create account, try again");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"));
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required!", { autoClose: 3000 });
      }
    } else if ("confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          console.log(token);
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
            setTimeout(() => setAction("logIn"));
          } else {
            throw Error();
          }
        } catch {
          toast.error("Can't confirm Secret!");
        }
      }
    }
  };
  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      //   password={password}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
