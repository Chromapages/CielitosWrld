import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'heavy';
  hover?: boolean;
}

/**
 * GlassCard - Premium glassmorphism card component
 * 
 * Variants:
 * - default: Standard glass effect (70% opacity, 12px blur)
 * - light: Subtle glass effect (40% opacity, 8px blur)
 * - heavy: Strong glass effect (85% opacity, 20px blur)
 * 
 * Usage:
 * <GlassCard>Content</GlassCard>
 * <GlassCard variant="light" hover>Interactive content</GlassCard>
 */
export function GlassCard({ 
  children, 
  className, 
  variant = 'default',
  hover = false 
}: GlassCardProps) {
  const variantStyles = {
    default: 'glass-card',
    light: 'glass-light',
    heavy: 'glass-heavy',
  };

  return (
    <div 
      className={cn(
        'rounded-2xl',
        variantStyles[variant],
        hover && 'hover-lift',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Typography wrapper for consistent text hierarchy
 */
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Display({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component className={cn('text-display', className)}>
      {children}
    </Component>
  );
}

export function Heading1({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component className={cn('text-h1', className)}>
      {children}
    </Component>
  );
}

export function Heading2({ children, className, as: Component = 'h2' }: TypographyProps) {
  return (
    <Component className={cn('text-h2', className)}>
      {children}
    </Component>
  );
}

export function Heading3({ children, className, as: Component = 'h3' }: TypographyProps) {
  return (
    <Component className={cn('text-h3', className)}>
      {children}
    </Component>
  );
}

export function Heading4({ children, className, as: Component = 'h4' }: TypographyProps) {
  return (
    <Component className={cn('text-h4', className)}>
      {children}
    </Component>
  );
}

export function Body({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn('text-body', className)}>
      {children}
    </Component>
  );
}

export function BodyLarge({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn('text-body-lg', className)}>
      {children}
    </Component>
  );
}

export function Caption({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn('text-caption', className)}>
      {children}
    </Component>
  );
}
