import { Buffer } from "buffer";


function Home() {

    let accessToken = '';
    var client_id = '51b5fbb27b834a9ea885257f52c7864e';
    var client_secret = '381e9f785fab4e51902014f448caf1bc';



    function callit(){

            if(accessToken === ''){
                console.log("token fetching");

                (async () => {
                    const rawResponse = await fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST', headers: {
                            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) ,
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                            json : true,
                            body: "grant_type=client_credentials&client_id=51b5fbb27b834a9ea885257f52c7864e&client_secret=381e9f785fab4e51902014f448caf1bc"
                    });
                    const content = await rawResponse.json();
                  
                    accessToken = content.access_token;
                    console.log(content.access_token);
                  })();
            }else{
                console.log("Fething playlists")
                // fetchProfile(accessToken);
            }


            //   http GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
            //   Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'     
            // https://open.spotify.com/playlist/6IRs4uMfjBzzI4ADvFagX8?si=5cab429ec262496a
    }

    async function fetchProfile(token) {
        console.log(token);

        const result = await fetch("https://api.spotify.com/v1/playlists/6IRs4uMfjBzzI4ADvFagX8?si=5cab429ec262496a", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
    
        const playlist = await result.json();
        console.log(playlist);
    }


  return (
    <div className="LoginHome">
        <button onClick={()=>{callit()}}>Click</button>
        <input type="radio" name="optionScreen" id="SignIn" hidden checked />
            <input type="radio" name="optionScreen" id="SignUp" hidden />

            <section>
                <div id="logo">
                    <img src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" alt="Spotify-Logo" width="50" />
                    <h1>Select a Playlist</h1>
                </div>

                <nav>
                    <label for="SignIn">Sign In</label>
                </nav>

                <form  id="SignInFormData">
                    <input type="text" id="username" placeholder="Username"/>
                    <input type="password" id="password" placeholder="Password"/>
                    <button type="button">Sing In</button>
                </form>

          

            </section>
    </div>
  );
}

export default Home;
