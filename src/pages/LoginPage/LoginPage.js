import BaseCard from '../../components/BaseCard/BaseCard';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import './LoginPage.css';

function LoginPage(){
    return (
      <div className="App">
        <BaseCard className="LoginCard">
          <img className="LogoPic" src="/Images/logo.png"></img>
          <div className="LoginInputsContainer">
            <label className='EmailLabel'>Email Address</label>
            <input className="EmailInput"></input>
            
            <label className='PasswordLabel'>Password</label>
            <input className="PasswordInput"></input>
          </div>

          <button className='LoginButton'>Login</button>
        </BaseCard>
      </div>
    );
}

export default LoginPage;