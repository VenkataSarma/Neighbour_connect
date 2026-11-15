import { clsx } from 'clsx';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
}

export const Avatar = ({ src, alt, fallback, size = 'md', online }: AvatarProps) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative inline-block">
      <div className={clsx(
        'rounded-full overflow-hidden flex items-center justify-center',
        'bg-[var(--accent-light)] text-[var(--accent)] font-medium',
        sizes[size]
      )}>
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(fallback || alt)}</span>
        )}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-[var(--success)] border-2 border-[var(--card)]" />
      )}
    </div>
  );
};
