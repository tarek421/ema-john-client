import React, { useContext } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import {
  handleSignInWithFacebook,
  handleSignInWithGoogle,
  HandleSignOut,
} from "./LoginManager";
import { userContext } from "../../App";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useHistory, useLocation } from "react-router";

const Login = () => {
  const [LoggedInUser, setLoggedInUser] = useContext(userContext);

  const history = useHistory();
  const Location = useLocation();
  let { from } = Location.state || { from: { pathname: "/" } };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleGoogleSignIn = () => {
    handleSignInWithGoogle()
      .then((res) => {handleResponse(res);})
      .catch((err) => {
        const errorMessage = err.message;
        toast.error(errorMessage);
      });
  };

  const handleFacebookSignIn = () => {
    handleSignInWithFacebook()
      .then((res) => handleResponse(res))
      .catch((err) => {
        const errorMessage = err.message;
        toast.error(errorMessage);
      });
  };



  const handleResponse = (res) => {
    const successMessage = "Successfully Logged In";
    toast.success(successMessage);
    setLoggedInUser(res);
    history.replace(from);
  };

  const handleSignOut = () => {
    HandleSignOut()
    .then((res) => {
      toast.success('Successfully Sign Out');
      setLoggedInUser(res);
    })
  }

  return (
    <div class="form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="input">
        <div class="inputBox">
          <label for="">Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="Enter Your Email"
            type="email"
          />
        </div>
        <div class="inputBox">
          <label for="">Password</label>
          <input
            {...register("password", { required: true })}
            placeholder="Enter Your Password"
            type="password"
          />
        </div>
        <div class="inputBox">
          {
            LoggedInUser.IsSignIn ?  <input type="submit" onClick={handleSignOut} name="" value="Sign Out" /> :  <input type="submit" name="" value="Log In" />
          }
        </div>
      </form>
      <div class="social">
        <button onClick={handleGoogleSignIn}>
          <FontAwesomeIcon icon={faGoogle} />
          <p>Sign In with Google</p>
        </button>
        <button onClick={handleFacebookSignIn}>
          <FontAwesomeIcon icon={faFacebook} />
          <p>Sign In with Facebook</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
