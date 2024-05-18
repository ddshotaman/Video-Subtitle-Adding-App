import React, { useState, useRef } from "react";
import AddSubtitle from "./components/Add Subtitle/add-subtitle-data";
import "./App.css";
function App() {
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [timestamp, setTimestamp] = useState(null);
    const handlePlayPause = () => {
        const video = videoRef.current;
    };

    const handleVideoError = () => {
        setVideoError(false);
    };

    const handTimestamp = (timestamp) => {
        setTimestamp(timestamp);
    };

    return (
        <div className="App">
             <img
                className="cross-btn"
                src="https://www.spyne.ai/wp-content/uploads/2023/05/Spyne-Black-Full-Logo-1-1.webp"
            />
            <h1 className="heading">Video Subtitle Adding App</h1>
            <input
                className="url-input"
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => {
                    setVideoUrl(e.target.value);
                    setVideoError(false);
                }}
                placeholder="Enter video URL"
                required
            />
            {videoError && <p className="error-message">Please provide a valid video URL.</p>}
            <div className="video-container">
                <video
                    controlsList="nofullscreen"
                    ref={videoRef}
                    src={videoUrl}
                    height={400}
                    width={800}
                    controls
                    onClick={handlePlayPause}
                    onError={handleVideoError}
                    onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
                ></video>

                {timestamp && <p className="subtitle">{timestamp}</p>}
              </div> 
            <AddSubtitle handTimestamp={handTimestamp} currentTime={currentTime} />
        </div>
    );
}

export default App;
