import './login.css';


function Login(props) {



    function loginSubmit(){
        var usern = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        props.setUsername(usern);
        props.setPassword(pass);
        
        if(usern === "pratham"){
            if(pass === "123"){
                alert("working");
            }
        }
    }

  return (
    <div className="LoginHome">
        
            <input type="radio" name="optionScreen" id="SignIn" hidden checked />
            <input type="radio" name="optionScreen" id="SignUp" hidden />

            <section>
                <div id="logo">
                    <img src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" alt="Spotify-Logo" width="50" />
                    <h1>Spotify</h1>
                </div>

                <nav>
                    <label for="SignIn">Sign In</label>
                </nav>

                <form  id="SignInFormData">
                    <input type="text" id="username" placeholder="Username"/>
                    <input type="password" id="password" placeholder="Password"/>
                    <button type="button" onClick={() => {loginSubmit()}}>Sing In</button>
                </form>

          

            </section>
    </div>
  );
}

export default Login;
