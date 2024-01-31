import { Buffer } from "buffer";
import './home.css';
import { useState } from "react";
import Spinner from "./spinner";

import { ReactComponent as Downloadit } from './assests/downloadit.svg';
import { ReactComponent as BeignDownloding } from './assests/progress.svg';
import { ReactComponent as Downloaded } from './assests/downloadDone.svg';
import { ReactComponent as Expand } from './assests/expand.svg';
import { ReactComponent as Hiden } from './assests/hide.svg';
// import { dlAudio } from "youtube-exec/src/types/audio";
import keys from ".//keys.json";
const API_BASE = "http://localhost:3001";

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [fliped, setflipped] = useState(false);
    const [name, setname] = useState("No Playlist");
    const [data, setdata] = useState();
    const [isworking, setisworking] = useState(false);
    const [downloadingSongs, setDownloadingSongs] = useState([]);
    const [downloadedSongs, setDownloadedSongs] = useState([]);
    const [hide, setHide] = useState(false);

    // const [link, setLink] = useState();

    let accessToken = '';
    const client_id = keys.SPOT_CLIENT_ID;
    var client_secret = keys.SPOT_SECRET_ID;


    function callit(){
        setIsLoading(true);
            let link = "";
            let templink = document.getElementById("link").value;
            if(templink === ""){
                alert("Please Enter a Link")
                setIsLoading(false);
                return;

            }
            for(let i=templink.length-1; i>=0; i--){
                if(templink[i] !== '/'){
                    link += templink[i];
                }else{
                    break;
                }
            }
            link = link.split("").reduce((acc, char) => char + acc, "");
            // console.log(link);
            // fetchProfile(accessToken,link);

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
                    // console.log(content.access_token);
                    fetchProfile(accessToken,link);

                })();
                
            }else{
                console.log("Fething playlists")
                fetchProfile(accessToken,link);
            }
            // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q='.urlencode($yt_search).'&key=AIzaSyA-6Om9C4ynVH8PhB_H7y8Pz5nbZYX80f4
            // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q='apple'&key=AIzaSyA-6Om9C4ynVH8PhB_H7y8Pz5nbZYX80f4
            // AIzaSyA-6Om9C4ynVH8PhB_H7y8Pz5nbZYX80f4
            //   http GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \ 
            //   Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'     
            // https://open.spotify.com/playlist/6IRs4uMfjBzzI4ADvFagX8?si=5cab429ec262496a
    }       

    async function fetchProfile(token,link) {
        // console.log(token);
        // console.log("https://api.spotify.com/v1/playlists/"+link);

        const result = await fetch("https://api.spotify.com/v1/playlists/"+link, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
    
        const playlist = await result.json();
        setname(playlist.name);
        setdata(playlist);
        // console.log(data);

         

        // setcard( playlist.tracks.items.map(item => {
        //     // console.log(item.track.name)
        //     return (<p>{item.track.name}</p>);
        // }));
        // document.getElementById("nameboximage").style.backgroundImage = "url(" + playlist.images[1].url + ")";
        setflipped(true);
        setIsLoading(false);

        // document.getElementById("playbox").append(cards);
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  
    function downloadQueue(songname , artist, id){
        let fetchurl =  "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q='"+ songname+ " by "+ artist +"&key="+keys.YOU_TOKEN;
        console.log(fetchurl);
        
        // setLink(fetchurl);
        // if(isworking){
        //     alert("Music is getting downloaded");
        // }else{
        //     // setisworking(true);
        //     console.log("calling rfunction");
        //     getVedioLink(fetchurl);
        // }

        if (downloadingSongs.includes(id)) {
            alert("Music is already being downloaded");
        } else {
            setDownloadingSongs((prevSongs) => [...prevSongs, id]);
            console.log("calling function");
            getVedioLink(fetchurl, id);
            console.log(downloadingSongs);
        }
            

    }

    async function getVedioLink(fetchurl, id){
        const vedioData = await fetch(fetchurl,{
            method: "GET"
        });
        const dat = await vedioData.json();
        loadingMusic("https://www.youtube.com/watch?v="+dat.items[0].id.videoId, dat.items[0].snippet.title, id)
    }



    const loadingMusic = async (fetchurl, nameOfSong, id) => {
        let data = await fetch(API_BASE + "/downloadit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url : fetchurl,
            name: nameOfSong
          }),
        });
        

        console.log(data.body);
        setDownloadingSongs((prevSongs) => prevSongs.filter((songId) => songId !== id));
        setDownloadedSongs((prevSongs) => [...prevSongs, id])
        // setisworking(false);


      };




    function coptyit(){
        navigator.clipboard.writeText("https://open.spotify.com/playlist/6IRs4uMfjBzzI4ADvFagX8?si=5cab429ec262496a");
    }

    function swapHide(){
        if(hide){
            setHide(false);
            document.getElementById("playbox").style.height = "200px";

        }else{
            setHide(true);
            document.getElementById("playbox").style.height = "400px";
        }
    }

  return (
    <div className="LoginHome">
        {isLoading ? <Spinner /> : 
            <div></div>
        }
        <section>
            {/* <button onClick={()=>{coptyit()}}>copy</button> */}
                <div id="logo">
                    <img src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" alt="Spotify-Logo" width="50" />
                    <h1>Select a Playlist</h1>
                    <div
                        id="musicdownloadbox"
                        onClick={() => {
                            swapHide();
                        }}
                        >
                        {hide ? <Expand fill="#343541" style={{ height: 30, width: 30 }} id="downloadit" />
                        : 
                            <Hiden fill="#343541" style={{ height: 30, width: 30 }} id="downloadit" />
                        }
                    </div>
                </div>
                {hide ? 
                    <></>
                :
                    <>   <nav>
                    <label>Paste the link of your public playlist</label>
                </nav>

                <form  id="SignInFormData">
                    <input type="text" id="link" placeholder="Play list link" disabled={isLoading}/>
                    <button type="button" onClick={()=>{callit()}} disabled={isLoading}>Get Playlist</button>
                </form>
                {fliped ?
                <div id="namebox">
                    <div id="nameboxborder">

                    <div id="nameboximage" style={{backgroundImage:"url(" + data.images[0].url + ")"}}></div>
                    <p id="nameboxname">{name}</p> 
                    </div>
                </div>
                 : <p></p>}</>
                }
                    

                <div id="playboxwrapper">
                <div id="filterit"></div>
                <div id="playbox" >
                    {fliped ? <></> : <p id="nullmusic" hidden={false}>Enter playlist link to see music</p>}
                    {data ? data.tracks.items?.map(item => {
                        return <div key={item.track.id}> 
                            <div id="musicbox">
                                <div id="musicimage" style={{backgroundImage:"url(" + item.track.album.images[2].url + ")"}}></div>
                                <div id="musictextbox">
                                    <p id="musictextboxname">{item.track.name}</p>
                                    <p id="musictextboxartist">{item.track.album.artists[0].name}</p>
                                </div>
                                <p id="musictime">{millisToMinutesAndSeconds(item.track.duration_ms)}</p>
                                <div
                                    id="musicdownloadbox"
                                    onClick={() => {
                                        downloadQueue(item.track.name, item.track.album.artists[0].name, item.track.id);
                                    }}
                                    style={{ cursor: downloadingSongs.includes(item.track.id) ? "not-allowed" : "pointer" }}
                                    >
                                    {downloadedSongs.includes(item.track.id) ? <Downloaded fill="#7e78ff" style={{ height: 30, width: 30 }} id="downloadit" />
                                    : 
                                        <>{downloadingSongs.includes(item.track.id) ? <BeignDownloding fill="#fad430" style={{ height: 30, width: 30 }} id="downloadit" className="spinIt" /> : <Downloadit fill="#1ed760" style={{ height: 30, width: 30 }} id="downloadit" />}</>
                                    }
                                </div>
                            </div>
                            </div>;
                    }) : <></> }
                </div>
                </div>
          

            </section>
    </div>
  );
}

export default Home;
