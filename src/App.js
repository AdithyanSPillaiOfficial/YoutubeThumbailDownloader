import { useState } from 'react';
import './App.css';


function extractYouTubeVideoId(url) {
  // Regular expression pattern to match the YouTube video ID
  var pattern = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;

  // Execute the regular expression to get the video ID
  var match = url.match(pattern);

  // If there's a match, return the video ID; otherwise, return null
  return (match && match[1]) ? match[1] : null;
}


function App() {
  var [url,setUrl] = useState('');
  var videoId,imgUrl;
  var [img,setImg] = useState('');
  var [toggleImage, setToggleImage] = useState(false);
  return (
    <div className="App">
      <h1>Youtube Thumbnail Downloader</h1>
      <input type="text" placeholder='Enter Youtube URL' value={url} onChange={(e)=>setUrl(e.target.value)} className='inputurl'/>
      <button className='submitbtn' onClick={()=>{
        videoId = extractYouTubeVideoId(url);
        imgUrl = "https://img.youtube.com/vi/"+videoId+"/maxresdefault.jpg";
        setImg(imgUrl);
        setToggleImage(true);

      }}>Get Thumbnail</button>
      {toggleImage && <img src={img} alt='Thumbnail' />}
    </div>
  );
}

export default App;
