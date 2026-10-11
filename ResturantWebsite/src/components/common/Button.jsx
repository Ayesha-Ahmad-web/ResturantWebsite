import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wider ' +
  'transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANTS = {
  primary: 'bg-ember text-char hover:bg-ember-glow shadow-[0_8px_30px_-8px_rgba(255,77,31,0.6)]',
  outline: 'border-2 border-cream/80 text-cream hover:bg-cream hover:text-char',
  ghost: 'text-cream hover:bg-white/10',
  dark: 'border border-white/10 bg-char-700 text-cream hover:bg-char-600',
};

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm sm:text-base',
};

// Renders a router <Link> (to), an <a> (href) or a <button>.
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}