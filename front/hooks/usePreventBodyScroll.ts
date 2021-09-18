import { useEffect } from 'react';

const usePreventBodyScroll = () => {
  useEffect(() => {
    document.body.classList.toggle('body-scroll-prevent');
    return () => {
      document.body.classList.toggle('body-scroll-prevent');
    };
  }, []);
};

export default usePreventBodyScroll;
