'use client';

import React, { useRef, useState } from 'react';

const Panel = ({ image, video, isCenter, letter, name, startTime = 0, className }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      if (startTime > 0 && videoRef.current.currentTime < startTime) {
        videoRef.current.currentTime = startTime;
      }
      videoRef.current.play().catch(err => console.log("Video play interrupted", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`panel ${isCenter ? 'center-panel' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'default' }}
    >
      {isCenter ? (
        <div className="center-panel-content" style={{ background: `url(${image}) center/cover` }}>
          <span className="center-panel-letter">{letter}</span>
        </div>
      ) : (
        <div className="panel-media-container">
          <img 
            src={image} 
            alt={name || "Destination panel"} 
            className="panel-image"
            style={{
              opacity: isHovered && video ? 0 : 0.7,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'opacity 0.6s ease, transform 0.8s ease',
            }}
          />
          {video && (
            <video
              ref={videoRef}
              src={video}
              loop
              muted
              playsInline
              autoPlay={false}
              preload="metadata"
              className={`panel-video ${className || ''}`}
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'opacity 0.6s ease, transform 0.8s ease',
              }}
            />
          )}
          {name && (
            <div 
              className="panel-label"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {name}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Panel;
