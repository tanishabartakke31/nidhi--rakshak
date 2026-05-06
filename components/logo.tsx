import Image from 'next/image';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'sm', className = '' }: LogoProps) {
  const sizes = {
    xs: { width: 12, height: 10 },
    sm: { width: 110, height: 94 },
    md: { width: 130, height: 110 },
    lg: { width: 160, height: 136 },
  };

  const { width, height } = sizes[size];

  return (
    <Image
      src="/nidhi-rakshak-logo.png"
      alt="Nidhi Rakshak"
      width={width}
      height={height}
      priority
      className={`opacity-90 hover:opacity-100 transition-opacity ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}
