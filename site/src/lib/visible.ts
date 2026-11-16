import { useEffect, useState, type RefObject } from 'react';

// One shared IntersectionObserver for every tile: icons only animate while they are on screen.
const subs = new Map<Element, (v: boolean) => void>();
let io: IntersectionObserver | null = null;
const observer = () =>
  (io ??= new IntersectionObserver((entries) => entries.forEach((e) => subs.get(e.target)?.(e.isIntersecting)), { rootMargin: '120px' }));

export function useVisible(ref: RefObject<Element | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    subs.set(el, setVisible);
    observer().observe(el);
    return () => {
      subs.delete(el);
      observer().unobserve(el);
    };
  }, [ref]);
  return visible;
}
