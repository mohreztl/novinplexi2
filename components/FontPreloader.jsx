import { memo } from 'react';

// Font preload component to prevent layout shifts
const FontPreloader = memo(() => {
  return (
    <>
      <link 
        rel="preload" 
        href="/fonts/YekanBakh/IRANSansXFaNum-Regular.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preload" 
        href="/fonts/YekanBakh/IRANSansXFaNum-Bold.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
    </>
  );
});

FontPreloader.displayName = 'FontPreloader';

export default FontPreloader;
