import { useState } from "react";
import { useUserCamera } from "../hooks/useUserCamera";

// Capture user video and audio
export const UserCamera = () => {
  const [isMirrored, setIsMirrored] = useState(false);

  const { videoRef, videoUrl, handleRecording, isRecording } = useUserCamera();

  const handleMirroring = () => {
    setIsMirrored((prevState) => !prevState);
  };

  return (
    <div>
      <video
        ref={videoRef}
        muted
        autoPlay
        style={{ transform: isMirrored ? "scaleX(-1)" : "none" }}
      />
      <button onClick={handleRecording}>
        {isRecording ? "Stop" : "Record"}
      </button>
      <button onClick={handleMirroring}>Mirror</button>
      {videoUrl && (
        <div>
          <h3>Recorded Video:</h3>
          <video controls src={videoUrl} className="recorded-video" />
        </div>
      )}
    </div>
  );
};
