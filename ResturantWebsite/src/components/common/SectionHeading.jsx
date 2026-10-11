import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

// title can be a string or an array of lines (each line animates in separately).
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  as: Tag = 'h2',
}) {
  const reduced = useReducedMotion();
  const lines = Array.isArray(title) ? title : [title];
  const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start';

  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <motion.p className="eyebrow mb-4" {...fade(0)}>
          {eyebrow}
        </motion.p>
      )}
      <Tag className="display-lg">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              initial={reduced ? false : { y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
      {subtitle && (
        <motion.p className="mt-5 max-w-xl text-base text-cream-dim sm:text-lg" {...fade(0.25)}>
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}