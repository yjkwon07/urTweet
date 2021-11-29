import { useEffect } from 'react';

import throttle from 'lodash/throttle';

interface IProps {
  callback: () => void;
}

const useEndReachScroll = ({ callback }: IProps) => {
  useEffect(() => {
    const onScroll = throttle(function () {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        callback();
      }
    }, 400);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [callback]);
};

export default useEndReachScroll;
