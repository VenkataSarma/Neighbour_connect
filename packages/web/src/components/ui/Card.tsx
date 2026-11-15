import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = ({
  children,
  padding = 'md',
  hover = false,
  className,
  ...props
}: CardProps) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={clsx(
        'bg-[var(--card)] border border-[var(--border)] rounded-lg transition-all',
        paddingStyles[padding],
        hover && 'hover:shadow-md hover:border-[var(--accent)] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
