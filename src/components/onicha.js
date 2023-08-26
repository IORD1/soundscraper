

const fs = require('fs');
const ytdl = require('ytdl-core');
// async function f(){
//     let  info =  await ytdl.getInfo('YLslsZuEaNE');
//     // console.log(info);
//     let format = ytdl.chooseFormat(info.formats, { quality: '134' });
//     console.log('Format found!', format);
//     let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
//     console.log('Formats with only audio: ');
//     console.log(audioFormats);
// }

// f();
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

ytdl('http://www.youtube.com/watch?v=YLslsZuEaNE',{ quality : 'lowestaudio' })
  .pipe(fs.createWriteStream('audio.mp3'))