import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api_calls/Api";
import BaseCard from "../../components/BaseCard/BaseCard";
import './CreateAccountPage.css'

function CreateAccountPage(){
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(null);

    const [userPassword, setUserPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(null);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(null); 

    function ValidateEmail() {
      if (userEmail === "") {
        setEmailIsValid(null);
        return;
      }

      if (!userEmail.includes("@")) {
        setEmailIsValid(false);
        return;
      }

      if (!userEmail.includes(".")) {
        setEmailIsValid(false);
        return;
      }

      if (userEmail.split("@")[1].includes("@")) {
        setEmailIsValid(false);
        return;
      }

      if (!userEmail.split("@")[1].includes(".")) {
        setEmailIsValid(false);
        return;
      }

      if (userEmail.endsWith(".")) {
        setEmailIsValid(false);
        return;
      }

      setEmailIsValid(true);
      return;
    }

    function ValidatePassword() {
      if (userPassword === "") {
        setPasswordIsValid(null);
        return;
      }

      if (userPassword.length < 8) {
        setPasswordIsValid(false);
        return;
      }

      var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)");

      if (!pattern.test(userPassword)) {
        setPasswordIsValid(false);
        return;
      }

      setPasswordIsValid(true);
      return;
    }

    function CheckForMatch() {
      if (confirmPassword === "") {
        setPasswordsMatch(null);
        return;
      }

      if (confirmPassword !== userPassword) {
        setPasswordsMatch(false);
        return;
      }

      setPasswordsMatch(true);
      return;
    }

    function CreateUser() {
      if (emailIsValid !== true) {
        return;
      }

      if (passwordIsValid !== true) {
        return;
      }

      if (passwordsMatch !== true) {
        return;
      }

      console.log("Everything Passed");

      axios.post(Api.baseURL + "createUser", {
        email: userEmail,
        password: userPassword,
        addedDate: new Date(),
        modifiedDate: new Date(),
      });

      navigate("/home", { state: { user: userEmail } });
    }

    useEffect(()=>{
        ValidateEmail();
    }, [userEmail])

    useEffect(() => {
      ValidatePassword();
    }, [userPassword]);
    
    useEffect(()=>{
        CheckForMatch();
    }, [confirmPassword])

    return (
      <div className="CreateAccountPage">
        <BaseCard className="LoginCard">
          <img className="LogoPic" src="/Images/logo.png"></img>

          <div className="CreateAccountInputsContainer">
            {emailIsValid === false && (
              <div className="CreateEmailErrorMessage">
                <label>* Invalid Email Entry</label>
              </div>
            )}

            <label className="EmailLabel">Email Address</label>
            <input
              className="EmailInput"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />

            {passwordIsValid === false && (
              <div className="CreatePasswordErrorMessage">
                <label>
                  * (Min 8 char, one uppercase, one lowercase, one number)
                </label>
              </div>
            )}

            <label className="PasswordLabel">New Password</label>
            <input
              className="PasswordInput"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />

            {passwordsMatch === false && (
              <div className="ReEnterPasswordErrorMessage">
                <label>
                  * Passwords do not match
                </label>
              </div>
            )}

            <label className="RePasswordLabel">Re-enter Password</label>
            <input
              className="PasswordInput"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <button className="CreateAccountButton" onClick={()=>{CreateUser();}}>Create User</button>

          <button className="BacktoLoginButton" onClick={() => navigate("../")}>
            Back to Login
          </button>
        </BaseCard>
      </div>
    );
}

export default CreateAccountPage;