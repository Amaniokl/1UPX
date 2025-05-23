import React, { useEffect, useRef } from 'react';

interface ScrollObserverProps {
  children: React.ReactNode;
}

const ScrollObserver: React.FC<ScrollObserverProps> = ({ children }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up the intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is in view
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Element is considered "visible" when 10% of it is visible
      }
    );

    // Target all elements with the 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Cleanup observer on component unmount
    return () => {
      if (observerRef.current) {
        fadeElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return <>{children}</>;
};

export default ScrollObserver;