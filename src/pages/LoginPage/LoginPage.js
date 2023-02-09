import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../api_calls/Api';
import BaseCard from '../../components/BaseCard/BaseCard';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import './LoginPage.css';

function LoginPage(){
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [accountIsValid, setAccountIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [user, setUser] = useState();
    const [userData, setUserData] = useState([]);
    const [usersGot, setUsersGot] = useState(false);
    const [loginPressed, setLoginPressed] = useState(false);
    const [initialRun, setInitialRun] = useState(true);

    useEffect(() => {
      async function getUsers() {
        try {
          const Users = await axios.get("https://guide-app-express-api.azurewebsites.net/api/users");

          if (!usersGot) {
            setUserData(Users.data);
            setUsersGot(true);
          }
        } catch (e) {
          console.error(e);
        } finally {
          console.log(userData);
        }
      }

      getUsers();
    });

    function ValidateEmail() {
      let UserFound = false;
      let user;

      UserFound = userData.some((User) => {
        user = User;
        return User.email.toLowerCase() === userEmail.toLowerCase();
      });

      if (UserFound) setUser(user);

      return UserFound;
    }

    function ValidatePassword() {
      if (user != null) {
        if (user.password === userPassword) return true;
      }
      return false;
    }

    function Login() {
      console.log(userEmail);
      let emailPassed;

      setEmailIsValid(true);
      setPasswordIsValid(true);
      setAccountIsValid(true);

      if (userEmail == "") {
        console.log("UserEmail is Empty");
        setErrorMessage("* Please enter your email");
        setEmailIsValid(false);
        emailPassed = false;
      } else if (!ValidateEmail()) {
        if (userPassword == "") {
          console.log("Password is Empty");
          setErrorMessage("* Please enter your password");
          setAccountIsValid(true);
          setPasswordIsValid(false);
        } else {
          console.log(userEmail + " Doesn't Exist")
          setErrorMessage("* Email or Password is Incorrect");
          setAccountIsValid(false);
          emailPassed = true;
        }
      } else {
        setEmailIsValid(true);
        setAccountIsValid(true);
        emailPassed = true;
        setLoginPressed(!loginPressed);
      }
    }

    useEffect(()=>{
      if(initialRun){
        setInitialRun(false);
        return;
      }

      if (userPassword == "") {
        console.log("Password is Empty");
        setErrorMessage("* Please enter your password");
        setAccountIsValid(true);
        setPasswordIsValid(false);
      } else if (!ValidatePassword()) {
        console.log(userPassword + " doesn't match " + userEmail);
        setErrorMessage("* Email or Password is Incorrect");
        setAccountIsValid(false);
      } else {
        setPasswordIsValid(true);
        setAccountIsValid(true);

        console.log(`Logged in as ${userEmail}`);
      }
    }, [loginPressed])

    return (
      <div className="App">
        <BaseCard className="LoginCard">
          <img className="LogoPic" src="/Images/logo.png"></img>
          <div className="LoginInputsContainer">
            {(!accountIsValid || !emailIsValid) && (
              <div className="TopErrorMessage">
                <label>{errorMessage}</label>
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

            {!passwordIsValid && (
              <div className='BottomErrorMessage'>
                <label>{errorMessage}</label>
              </div>
            )}

            <label className="PasswordLabel">Password</label>
            <input
              className="PasswordInput"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </div>

          <button className="LoginButton" onClick={Login}>
            Login
          </button>

          <button className='CreateUserButton' onClick={()=>navigate("new-user")}>Create User</button>
        </BaseCard>
      </div>
    );
}

export default LoginPage;