import './login.css';

function Login() {
  return (
    <div className="LoginHome">
        <p>Your Username</p>
        <input type='text' id='usern' />
        <p>Your Password</p>
        <input type='text' id='pass'/>
    </div>
  );
}

export default Login;
