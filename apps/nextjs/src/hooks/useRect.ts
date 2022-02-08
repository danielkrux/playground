import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const useRect = () => {
  const ref = useRef(null);
  const [bbox, setBbox] = useState<DOMRect>();

  const set = () =>
    setBbox(
      ref && ref.current ? ref.current.getBoundingClientRect() : undefined
    );

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [bbox, ref] as const;
};

export default useRect;
