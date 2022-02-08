import React, { useEffect } from 'react';

function useClickOutside(
  ref: React.RefObject<any>,
  onClickOutside: () => void,
  ignoreRef?: React.RefObject<any>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !ref.current?.contains(event.target) &&
        !ignoreRef?.current.contains(event.target as any)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, ignoreRef, onClickOutside]);
}

export default useClickOutside;
