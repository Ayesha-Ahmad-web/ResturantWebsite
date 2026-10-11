import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register once, at module load. Importing from here everywhere guarantees a single registration.
gsap.registerPlugin(ScrollTrigger);

// Avoid jumpy refreshes when mobile browser toolbars show/hide.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };