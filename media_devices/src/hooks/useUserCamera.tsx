import { useEffect, useRef, useState } from "react";

export const useUserCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState<boolean | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Capture user webcam
  const getMediaDevices = async () => {
    try {
      const _stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(_stream);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  useEffect(() => {
    // Initialize the stream and video element
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }

    if (!stream) return;

    // Set up the MediaRecorder
    mediaRecorderRef.current = new MediaRecorder(stream);
    // store recording
    mediaRecorderRef.current.ondataavailable = (event) => {
      setRecordedChunks((prev) => [...prev, event.data]);
    };
  }, [stream]);

  useEffect(() => {
    // Get media stream when the component mounts
    getMediaDevices();
  }, []);

  // when data store - convert it to url
  useEffect(() => {
    if (!isRecording && stream) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    }
  }, [recordedChunks]);

  useEffect(() => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.start();
      }
    } else {
      mediaRecorderRef?.current?.stop();
    }
  }, [isRecording]);

  // control state of recording
  const handleRecording = () => {
    setIsRecording((prevState) => !prevState);
    setVideoUrl(null);
  };

  return { isRecording, videoRef, videoUrl, handleRecording };
};
