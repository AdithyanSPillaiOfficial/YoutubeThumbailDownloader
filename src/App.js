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




const handleDownloadThumbnail = async (imgUrl, videoId) => {
  try {
    var imgtg = document.getElementById('thumbnail');
    imgtg.crossOrigin = 'Anonymous';
    var canvas = document.createElement('canvas');
    canvas.width = imgtg.width;
    canvas.height = imgtg.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(imgtg, 0, 0);

    // Convert canvas content to a blob
    canvas.toBlob(async function (blob) {
      try {
        // Create a blob URL for the image blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');

        // Set the href attribute to the blob URL
        link.href = blobUrl;

        // Set the download attribute with a suggested file name
        link.download = `thumbnail_${videoId}.png`;

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click event on the link to initiate the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);

        // Revoke the blob URL to free up resources
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Error creating object URL or initiating download:', error);
        alert("Error Occured. Long Press the image to save the image");
      }
    }, 'image/png'); // Specify the MIME type for the blob, in this case, image/png
  } catch (error) {
    console.error('Error downloading thumbnail:', error);
    alert(error);
  }
};


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
      {toggleImage && <div><img src={img} alt='Thumbnail' id='thumbnail'/>
      <button className='imgdlbtn' onClick={ async ()=> { await handleDownloadThumbnail(img,extractYouTubeVideoId(url))}}>Download Image</button></div>}
    </div>
  );
}

export default App;
