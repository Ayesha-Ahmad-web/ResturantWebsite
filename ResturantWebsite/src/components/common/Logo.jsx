import { Link } from 'react-router-dom';
import { restaurant } from '../../config/restaurant';

export default function Logo({ className = '', onClick }) {
  return (
    <Link
      to="/#home"
      onClick={onClick}
      aria-label={`${restaurant.name} home`}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="#FF4D1F" />
        <path d="M8 18c0-6 5-9 12-9s12 3 12 9z" fill="#0C0B0A" />
        <rect x="7" y="21" width="26" height="3" rx="1.5" fill="#0C0B0A" />
        <rect x="8" y="26" width="24" height="5" rx="2.5" fill="#0C0B0A" />
      </svg>
      <span className="font-display text-xl uppercase leading-none tracking-tight text-cream sm:text-2xl">
        STACK'D<span className="text-ember"> BURGER</span>
      </span>
    </Link>
  );
}