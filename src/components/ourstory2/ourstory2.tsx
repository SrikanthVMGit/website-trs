'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ourstory2.module.css';

interface PanelData {
  id: string;
  counter: string;
  watermark: string;
  eyebrow: string;
  heading: string[];
  description: string;
  bgImage: string;
}

const panels: PanelData[] = [
  {
    id: 'p1',
    counter: '01 — 03',
    watermark: 'I',
    eyebrow: 'The Rare Source',
    heading: ['Our', 'Ingredients'],
    description:
      'Hand-picked organic Madagascar pods and single-origin cocoa. We believe the rarest flavors are found in the details of the earth.',
    bgImage:
      'https://images.unsplash.com/photo-1572696829022-8fc84c43cf5e?q=80&w=3686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'p2',
    counter: '02 — 03',
    watermark: 'II',
    eyebrow: 'A Timeless Craft',
    heading: ['The', 'Legacy'],
    description:
      'Tracing our roots back to artisanal methods where time was the secret ingredient. Every scoop carries seventy years of frozen perfection.',
    bgImage:
      'https://images.unsplash.com/photo-1742968423656-eeb3e41464bd?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'p3',
    counter: '03 — 03',
    watermark: 'III',
    eyebrow: 'Defining Luxury',
    heading: ['The', 'Vision'],
    description:
      'Revolutionizing the palate. Our goal is to transform a simple treat into a multi-sensory experience that defines the modern era of taste.',
    bgImage:
      'https://images.unsplash.com/photo-1651842461850-2bd499a2ed54?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function OurStory() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let followerX = 0;
    let followerY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      animFrame = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    animFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@300;600&display=swap"
        rel="stylesheet"
      />

     

      {/* Panels */}
      <div id="our-story-2" className={styles.container}>
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={styles.panel}
            onMouseEnter={() => setHoveredPanel(panel.id)}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            {/* Background image */}
            <div
              className={styles.bgImage}
              style={{ backgroundImage: `url('${panel.bgImage}')` }}
            />

            {/* Watermark */}
            <div className={styles.watermark}>{panel.watermark}</div>

            {/* Content */}
            <div className={styles.content}>
              <div className={styles.counter}>{panel.counter}</div>
              <span className={styles.eyebrow}>{panel.eyebrow}</span>
              <h2 className={styles.heading}>
                {panel.heading[0]}
                <br />
                {panel.heading[1]}
              </h2>
              <div className={styles.goldLine} />
              <p className={styles.description}>{panel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}