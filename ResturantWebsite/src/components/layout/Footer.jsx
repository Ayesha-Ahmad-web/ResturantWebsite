import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Music2, Phone } from 'lucide-react';
import { restaurant } from '../../config/restaurant';
import Logo from '../common/Logo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const footerLinks = [...restaurant.navLinks, { label: 'Full Menu', to: '/menu' }];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setStatus({ type: 'error', message: 'That email does not look right. Try name@example.com.' });
      return;
    }
    // DEMO ONLY: nothing is sent or stored. Connect a real service here later.
    setStatus({ type: 'success', message: 'Demo only: your email looks valid, but nothing was sent or saved.' });
    setEmail('');
  };

  const telHref = `tel:${restaurant.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/5 bg-char-800">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-cream-dim">{restaurant.statement}</p>
          <div className="mt-6 flex gap-3">
            <a href={restaurant.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream-dim transition hover:border-ember hover:text-ember">
              <Instagram size={18} />
            </a>
            <a href={restaurant.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream-dim transition hover:border-ember hover:text-ember">
              <Facebook size={18} />
            </a>
            <a href={restaurant.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream-dim transition hover:border-ember hover:text-ember">
              <Music2 size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="eyebrow mb-5">Explore</h3>
          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-cream-dim transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-5">Contact</h3>
          <ul className="space-y-3 text-cream-dim">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-ember" />
              <span>
                {restaurant.address.line1}
                <br />
                {restaurant.address.line2}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-ember" />
              <a href={telHref} className="hover:text-cream">{restaurant.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-ember" />
              <a href={`mailto:${restaurant.email}`} className="break-all hover:text-cream">{restaurant.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Get the drops</h3>
          <p className="mb-4 text-cream-dim">New burgers and offers, straight to your inbox.</p>
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.type !== 'idle') setStatus({ type: 'idle', message: '' });
                }}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={status.type === 'error'}
                aria-describedby="newsletter-msg"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-char-700 px-5 py-3 text-sm text-cream placeholder:text-cream-mute focus:border-ember focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ember text-char transition hover:bg-ember-glow active:scale-95"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            <p
              id="newsletter-msg"
              aria-live="polite"
              className={`mt-3 min-h-[1.25rem] text-sm ${status.type === 'error' ? 'text-ember-glow' : 'text-leaf'}`}
            >
              {status.message}
            </p>
          </form>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="select-none whitespace-nowrap text-center font-display uppercase leading-none"
        style={{
          fontSize: 'clamp(3rem, 16vw, 14rem)',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(246,235,217,0.12)',
        }}
      >
        STACK'D
      </p>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm text-cream-mute sm:flex-row">
          <p>© {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
          <p>Demo website: checkout and reviews are sample content.</p>
        </div>
      </div>
    </footer>
  );
}