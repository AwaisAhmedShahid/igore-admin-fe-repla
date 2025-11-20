import { useState, useEffect } from 'react';

interface UseResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

export const useResponsive = (): UseResponsiveReturn => {
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial width
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: screenWidth < 768, // sm breakpoint
    isTablet: screenWidth >= 768 && screenWidth < 1024, // md to lg breakpoint
    isDesktop: screenWidth >= 1024, // lg breakpoint and above
    screenWidth,
  };
};