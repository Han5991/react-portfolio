import {throttle} from 'lodash';
import {useEffect, useState} from 'react';

function useScrollEnd() {
  const [scrollEnd, setScrollEnd] = useState(false);

  useEffect(() => {
    const handleScrollEnd = throttle(() => {
      const {scrollY, innerHeight} = window;
      const contentHeight = document.documentElement.scrollHeight;
      setScrollEnd(scrollY + innerHeight >= contentHeight);
    }, 2);

    window.addEventListener('scroll', handleScrollEnd);
    return () => window.removeEventListener('scroll', handleScrollEnd);
  }, []);

  return scrollEnd;
}

export default useScrollEnd;
