import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable smooth scroll temporarily for instant jump
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }

    // Restore original scroll behavior
    // Use a small timeout to ensure the jump happened before restoring smooth scroll for user interactions
    setTimeout(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    }, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
