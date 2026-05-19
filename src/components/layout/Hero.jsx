'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Panel from './Panel';

const Hero = () => {
  const panelsRef = useRef([]);

  useEffect(() => {
    // Premium staggered entry animation with GSAP
    if (panelsRef.current.length > 0) {
      gsap.fromTo(panelsRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, stagger: 0.08, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  const panels = [
    { 
      id: 1, 
      name: "Zvartnots",
      image: "/images/hero-panels/zvartnots_clean.png", 
      video: "https://v1.pinimg.com/videos/iht/expMp4/e8/2d/fe/e82dfef0686a40b1b93ce50d9401cefd_720w.mp4",
      height: '75%', 
      offset: '10%' 
    },
    { 
      id: 2, 
      name: "Geghard", 
      image: "/images/hero-panels/geghard_clean.png", 
      video: "https://v1.pinimg.com/videos/mc/720p/d8/49/54/d84954f0f98a1a1f4e12f52c2b5f3d88.mp4",
      height: '85%', 
      offset: '-5%' 
    },
    { 
      id: 3, 
      name: "Gyumri", 
      image: "/images/hero-panels/gyumri_clean.png", 
      video: "https://v1.pinimg.com/videos/iht/720p/23/c8/eb/23c8eb73ba520444d9624e880430e508.mp4",
      height: '80%', 
      offset: '5%' 
    },
    { 
      id: 4, 
      name: "Sevan", 
      image: "/images/hero-panels/sevan_clean.png", 
      video: "https://v1.pinimg.com/videos/mc/720p/7f/35/93/7f3593907c0a7dd0e9e33b85614d0e33.mp4",
      height: '90%', 
      offset: '-2%' 
    },
    { 
      id: 5, 
      image: "/images/hero-panels/center.png", 
      isCenter: true, 
      letter: "A", 
      height: '100%', 
      offset: '0%' 
    },
    { 
      id: 6, 
      name: "Garni", 
      image: "/images/hero-panels/garni_clean.png", 
      video: "https://v1.pinimg.com/videos/iht/720p/90/78/f5/9078f591f6ac0c2e269fe7abb7bde23e.mp4",
      height: '88%', 
      offset: '3%' 
    },
    { 
      id: 7, 
      name: "Symphony of Stones", 
      image: "/images/hero-panels/symphony_clean.png", 
      video: "https://v1.pinimg.com/videos/iht/expMp4/19/f8/fc/19f8fc5b1ed3fa0ad81eba391f3d9e2f_720w.mp4",
      height: '82%', 
      offset: '-8%' 
    },
    { 
      id: 8, 
      name: "Ejmiatsin", 
      image: "/images/hero-panels/ejmiatsin_clean.png", 
      video: "https://v1.pinimg.com/videos/iht/expMp4/e8/2d/fe/e82dfef0686a40b1b93ce50d9401cefd_720w.mp4",
      height: '78%', 
      offset: '12%' 
    },
    { 
      id: 9, 
      name: "Charents Arch", 
      image: "/images/hero-panels/charents_clean.png", 
      video: "https://v1.pinimg.com/videos/iht/720p/19/b3/9b/19b39b6b44f3eba35fef438e0b9dcdea.mp4",
      height: '85%', 
      offset: '-4%' 
    },
  ];

  return (
    <div className="hero-container relative w-full h-full flex items-center justify-center">
      <div className="panels-grid">
        {panels.map((panel, index) => (
          <div 
            key={panel.id} 
            className="panel-wrapper"
            ref={el => panelsRef.current[index] = el}
            style={{ height: panel.height, transform: `translateY(${panel.offset})` }}
          >
            <Panel 
              image={panel.image} 
              video={panel.video}
              startTime={panel.startTime}
              name={panel.name}
              isCenter={panel.isCenter} 
              letter={panel.letter}
              className={panel.hideWatermark ? 'hide-watermark' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
