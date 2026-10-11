import { useEffect, useState } from 'react';

// Generated SVG burger, shown when a photo is missing or fails to load.
export function BurgerFallback({ className = '' }) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true">
      <ellipse cx="100" cy="158" rx="78" ry="7" fill="#1C1916" />
      <path d="M20 70C20 30 60 12 100 12C140 12 180 30 180 70Z" fill="#E8A83A" />
      <ellipse cx="62" cy="40" rx="5" ry="2.5" fill="#F6CF7A" />
      <ellipse cx="96" cy="28" rx="5" ry="2.5" fill="#F6CF7A" />
      <ellipse cx="130" cy="42" rx="5" ry="2.5" fill="#F6CF7A" />
      <rect x="14" y="70" width="172" height="13" rx="6.5" fill="#6FB33C" />
      <rect x="22" y="82" width="156" height="11" rx="5" fill="#E0412B" />
      <path d="M18 92H182L168 112L152 98L136 112L120 98L104 112L88 98L72 112L56 98L40 112Z" fill="#F2A91E" />
      <rect x="16" y="98" width="168" height="22" rx="11" fill="#5A2E1A" />
      <path d="M22 122H178C178 142 160 150 100 150C40 150 22 142 22 122Z" fill="#E8A83A" />
    </svg>
  );
}

// Wrapper reserves its own space (give it an aspect ratio / height via className)
// so there is no layout shift while the image loads.
export default function SafeImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  eager = false,
  width,
  height,
}) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-char-600 ${className}`}>
      {failed ? (
        <div role="img" aria-label={alt} className="flex h-full w-full items-center justify-center p-6">
          <BurgerFallback className="w-3/5 max-w-[220px]" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}