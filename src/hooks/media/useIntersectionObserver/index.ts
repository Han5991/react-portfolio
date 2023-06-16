import {useRef, useEffect} from 'react';

const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (target.current) {
      observer = new IntersectionObserver(callback, options);
      observer.observe(target.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [callback, options]);

  return target;
};

export default useIntersectionObserver;
