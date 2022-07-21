import { useState } from 'react';
import Head from 'next/head'

export default function Home() {
const [imageSrc, setImageSrc] = useState();
const [uploadData, setUploadData] = useState();

function handleOnChange(changeEvent) {
  const reader = new FileReader();

  reader.onload = function(onLoadEvent) {
    setImageSrc(onLoadEvent.target.result);
    setUploadData(undefined);
  }

  reader.readAsDataURL(changeEvent.target.files[0]);
}
async function handleOnSubmit(event) {
  event.preventDefault();

  const results = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({
      image: imageSrc
    })
  }).then(r => r.json());

  setUploadData(results);
}
return (
  <div>
    <Head>
      <title>Image Uploader</title>
      <meta name="description" content="Upload your image to Cloudinary!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main >
      <h1>
        Image Uploader
      </h1>

      <p>
        Upload your image to Cloudinary!
      </p>

      <form  method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>
        
        <img src={imageSrc} />
        
      </form>
    </main>

  </div>
)
}
