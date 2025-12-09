import { useState, useEffect, useRef } from "react";
import groupImg from "../assets/people/group/group.jpg";
import group2022Img from "../assets/people/group/group2022.jpg";

const images = [
  { src: groupImg, label: "Lab Group" },
  { src: group2022Img, label: "Lab Group 2022" },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, 5000);
  };

  // Auto-rotate to the left every 5 seconds
  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetTimer();
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  const currentImage = images[currentIndex];

  return (
    <div className="image-carousel" data-transitioning={isTransitioning} onAnimationEnd={() => setIsTransitioning(false)}>
      <img src={currentImage.src} alt={currentImage.label} className="image-carousel__image" />
      <div className="image-carousel__overlay">
        <button
          className="image-carousel__arrow image-carousel__arrow--left"
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          ←
        </button>
        <div className="image-carousel__label">{currentImage.label}</div>
        <button
          className="image-carousel__arrow image-carousel__arrow--right"
          onClick={handleNext}
          aria-label="Next image"
        >
          →
        </button>
      </div>
    </div>
  );
}
