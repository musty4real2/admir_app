import React from "react";
import Input from "../../../components/Inputs";
import { InputGroup, AuthWrapper } from "../style/user-auth.styled";
import { Button } from "../../../components/Buttons";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { authEndpoints } from "../../../routes/endpoints";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthErrMsg, AuthSuccessMsg } from "../../../components/Modals";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [signInSuccess, setSignInSuccess] = React.useState();
  const [signInError, setSignInError] = React.useState();
  const router = useRouter();

  const handlePwdVisibility = () => {
    setPasswordVisibility(passwordVisibility ? false : true);
  };

  const validateSignIn = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    let pwdErr = document.querySelector(".pwd-err");
    let email_err = document.querySelector(".email-err");
    let err_msg = document.querySelector("#err");

    if (!email && !password) {
      err_msg.innerHTML = "Email and Password cannot be empty.";
    } else if (!email) {
      email_err.innerHTML = "Email address cannot be empty";
    } else if (password.length === 4) {
      pwdErr.innerHTML = "Password should be greater than four characters";
    } else if (!password) {
      pwdErr.innerHTML = "Password cannot be empty";
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      validateSignIn();

      const response = await axios({
        method: "POST",
        url: authEndpoints.login,
        data: {
          emailWorkerId: email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.msg);
      setSignInSuccess(response.data.msg);
      setSignInError("");
      setTimeout(() => {
        router.push("/dashboard");
      }, 400);
    } catch (error) {
      const { data } = error.response;
      setSignInError(data.msg);
      setSignInSuccess(null);
    }
  };

  React.useEffect(() => {
    router.prefetch("/dashboard");
  });

  return (
    <React.Fragment>
      <div className="signup-text">
        <Fade>
          <p>
            Don’t have an account? {""}{" "}
            <Link href="/signup">
              <span>Sign Up</span>
            </Link>
          </p>
        </Fade>
      </div>
      <AuthWrapper>
        {signInError ? <AuthErrMsg message={signInError} /> : ""}
        {signInSuccess ? <AuthSuccessMsg message={signInSuccess} /> : ""}
        <form className="signin-form" onSubmit={handleSignIn}>
          <Fade direction="up" cascade triggerOnce>
            <h1>Log In</h1>
            <InputGroup>
              <label htmlFor="email">Email address*</label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="email-err"></p>
            </InputGroup>
            <InputGroup>
              <label htmlFor="password">Password*</label>
              <Input
                name="password"
                type={passwordVisibility ? "text" : "password"}
                id="password"
                placeholder="password should contain uppercase letter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span class="show-pwd" onClick={handlePwdVisibility}>
                show
              </span>
              <p className="pwd-err"></p>
              <p className="forgot-pwd">Forgot password?</p>
            </InputGroup>
            <Button
              fill="var(--primary)"
              name="signin-button"
              className="signin-btn"
              type="submit"
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </Fade>
        </form>
      </AuthWrapper>
    </React.Fragment>
  );
};

export default SignIn;
