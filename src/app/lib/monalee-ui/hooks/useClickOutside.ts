import { useEffect, RefObject } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: (event: MouseEvent) => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside(event);
      }
    }

    window.addEventListener('click', handleClickOutside, true);
    return () => {
      window.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, onClickOutside]);
};
