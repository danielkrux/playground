import React from 'react';

function useClickOutside<T extends HTMLElement = any>(
  ref: React.MutableRefObject<T>,
  callback: () => void
) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}

export default useClickOutside;
