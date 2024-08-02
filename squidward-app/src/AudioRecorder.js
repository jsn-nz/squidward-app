// src/AudioRecorder.js
import React, { useState, useRef } from 'react';
import './AudioRecorder.css';
import neutralImage from './neutral.png'; // Ensure you have a neutral image
import happyImage from './happy.png';
import angryImage from './angry.png';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [imageSrc, setImageSrc] = useState(neutralImage);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          chunks.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
          chunks.current = [];
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
        };

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const speechToText = event.results[0][0].transcript;
          setTranscript(speechToText);
          decideImage();
        };

        recognition.onerror = (event) => {
          console.error('Error during transcription:', event.error);
        };

        recognitionRef.current = recognition;
        recognition.start();

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(err => console.error('Error accessing media devices.', err));
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const decideImage = () => {
    const random = Math.random();
    if (random < 0.5) {
      setImageSrc(happyImage);
    } else {
      setImageSrc(angryImage);
    }
  };

  return (
    <div className="audio-recorder">
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {isRecording && <div className="recording-indicator"></div>}
      <p>Transcript: {transcript}</p>
      <img src={imageSrc} alt="Emotion" />
    </div>
  );
};

export default AudioRecorder;
