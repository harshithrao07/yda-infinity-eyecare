"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Gallery.module.css";
import Image from "next/image";

const Gallery = () => {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/7.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const updateCarousel = useCallback(
    (newIndex) => {
      if (isAnimating) return;

      setIsAnimating(true);
      const normalizedIndex = (newIndex + images.length) % images.length;
      setCurrentIndex(normalizedIndex);

      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    },
    [isAnimating, images.length]
  );

  const getCardClass = (index) => {
    const offset = (index - currentIndex + images.length) % images.length;

    if (offset === 0) return styles.center;
    if (offset === 1) return styles.right1;
    if (offset === 2) return styles.right2;
    if (offset === images.length - 1) return styles.left1;
    if (offset === images.length - 2) return styles.left2;
    return styles.hidden;
  };

  const handleSwipe = useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
  }, [touchStartX, touchEndX, currentIndex, updateCarousel]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        updateCarousel(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateCarousel(currentIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, updateCarousel]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].screenX);
    handleSwipe();
  };

  return (
    <div
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h1 className={styles.aboutTitle}>GALLERY</h1>

      <div className={styles.carouselContainer}>
        <button
          className={`${styles.navArrow} ${styles.left}`}
          onClick={() => updateCarousel(currentIndex - 1)}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className={styles.carouselTrack}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.card} ${getCardClass(index)}`}
              onClick={() => updateCarousel(index)}
              data-index={index}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <button
          className={`${styles.navArrow} ${styles.right}`}
          onClick={() => updateCarousel(currentIndex + 1)}
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => updateCarousel(index)}
            data-index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
