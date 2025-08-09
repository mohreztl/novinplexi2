"use client";

import Image from 'next/image';
import { useState } from 'react';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style = {},
  onLoad,
  onError,
  ...props
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = (e) => {
    setImageLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setImageError(true);
    if (onError) onError(e);
  };

  // Fallback to placeholder if image fails to load
  const imageSrc = imageError ? '/placeholder.webp' : src;

  const imageProps = {
    src: imageSrc,
    alt: alt || '',
    quality,
    placeholder: placeholder === 'blur' ? 'blur' : 'empty',
    blurDataURL: placeholder === 'blur' ? blurDataURL : undefined,
    priority,
    sizes: !fill ? sizes : undefined,
    onLoad: handleLoad,
    onError: handleError,
    style: {
      ...style,
      transition: 'opacity 0.3s ease-in-out',
      opacity: imageLoaded ? 1 : 0.7,
    },
    className: `${className} ${imageLoaded ? 'loaded' : 'loading'}`,
    ...props
  };

  if (fill) {
    return <Image {...imageProps} alt={alt || ''} fill />;
  }

  return (
    <Image
      {...imageProps}
      alt={alt || ''}
      width={width}
      height={height}
    />
  );
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  ...props
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        {...props}
      />
    </div>
  );
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      placeholder="blur"
      {...props}
    />
  );
}
