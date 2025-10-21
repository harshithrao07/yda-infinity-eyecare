"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Gallery.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import {
  Navigation,
  Pagination,
  Keyboard,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow"; // Import coverflow effect styles

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [lightboxSwiper, setLightboxSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ Track client mount

  // Detect mobile and mount status
  useEffect(() => {
    setIsMounted(true); // client has mounted
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      if (lightboxOpen) {
        if (e.key === "Escape") {
          setLightboxOpen(false);
        }
      } else {
        if (e.key === "ArrowLeft") {
          updateCarousel(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
          updateCarousel(currentIndex + 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, updateCarousel, lightboxOpen]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].screenX);
    handleSwipe();
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setTimeout(() => {
      if (lightboxSwiper) {
        lightboxSwiper.slideTo(index);
      }
    }, 0);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.aboutTitle}>GALLERY</h1>

        <div className={styles.carouselContainer}>
          {/* Desktop Manual Carousel */}
          {!isMobile ? (
            <>
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
            </>
          ) : (
            /* Mobile Swiper with Coverflow Effect */
            <Swiper
              modules={[Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={2}
              coverflowEffect={{
                rotate: 40,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              style={{
                width: "100%",
                paddingTop: "20px",
                paddingBottom: "50px",
                overflow: "hidden",
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "3/4",
                      borderRadius: "10px",
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: "#000",
                      opacity: currentIndex === index ? 1 : 0.8, // ✅ Dim side slides
                      transition: "opacity 0.4s ease",
                    }}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* Grid View Section */}
      <div
        style={{
          padding: isMobile ? "0 1rem 2rem" : "4rem 2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(auto-fill, minmax(110px, 1fr))"
              : "repeat(auto-fill, minmax(220px, 1fr))", // Bigger cards for desktop
            gap: isMobile ? "0.75rem" : "1.5rem",
            width: isMobile ? "100%" : "90%", // Center grid and limit width
            maxWidth: "1400px", // Prevent overly wide grids
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                aspectRatio: "1",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
              }}
              onClick={() => openLightbox(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={image}
                alt={`Gallery thumbnail ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                {/* This SVG is fine, it only shows on hover (desktop) */}
                <svg
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "white",
                    opacity: 0.6,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m21 21-4.35-4.35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 8v6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 11h6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox with Swiper (Unchanged) */}
      {lightboxOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={closeLightbox}
        >
          <button
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "white",
              fontSize: "3rem",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "50%",
              transition: "background 0.3s",
              zIndex: 10000,
            }}
            onClick={closeLightbox}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            aria-label="Close lightbox"
          >
            ×
          </button>

          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              navigation={!isMobile}
              pagination={{
                type: "fraction",
                formatFractionCurrent: (number) => number,
                formatFractionTotal: (number) => number,
              }}
              keyboard={{
                enabled: true,
                onlyInViewport: false,
              }}
              loop={true}
              initialSlide={lightboxIndex}
              onSwiper={setLightboxSwiper}
              onSlideChange={(swiper) => setLightboxIndex(swiper.realIndex)}
              style={{
                width: "90vw",
                height: "80vh",
                maxWidth: "1400px",
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                "--swiper-navigation-size": "44px",
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <style jsx global>{`
            .swiper-button-next,
            .swiper-button-prev {
              background: transparent;
              transition: background 0.3s;
              border-radius: 50%;
              width: 44px !important;
              height: 44px !important;
            }
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
              background: rgba(255, 255, 255, 0.1);
            }
            .swiper-pagination {
              bottom: 1rem !important;
            }
            .swiper-pagination-fraction {
              font-size: 1.125rem;
              color: white;
            }
            .swiper-pagination-bullet {
              background: #fff;
            }
            .swiper-pagination-bullet-active {
              background: #fff;
            }

            /* Hide navigation arrows on mobile */
            @media (max-width: 767px) {
              .swiper-button-next,
              .swiper-button-prev {
                display: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Gallery;
