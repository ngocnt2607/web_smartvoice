import React, { useState } from "react";
import PropTypes  from 'prop-types'

const UploadAudioProps =  {
  setAudio: PropTypes.func.isRequired,
}


function UploadAudio({setAudio}) {
  const [source, setSource] = useState();

  const handleFiles = (event) => {
    const files = event.target.files;
    const audioSouce = URL.createObjectURL(files[0]);
    setAudio(files[0])
    setSource(audioSouce);
    document.getElementById("audio").load();
  };

  return (
    <>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <input type="file" id="upload" onChange={handleFiles} />
      <audio id="audio" controls style={{ paddingTop: 5 }}>
        <source src={source} id="src" />
      </audio>
      <script></script>
    </>
  );
}

UploadAudio.propTypes = UploadAudioProps

export default React.memo(UploadAudio)
