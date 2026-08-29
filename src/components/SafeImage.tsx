import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SafeImage({
  src,
  alt,
  label,
  className,
  style
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`img-fallback ${className ?? ""}`} style={style}>
        <ImageIcon size={26} strokeWidth={1.6} />
        <span>{label ?? alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}