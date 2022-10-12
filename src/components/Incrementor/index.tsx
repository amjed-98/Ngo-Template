import { type ReactHTML, useEffect, useState, type FC } from 'react';

type TProps = {
  start?: number;
  end: number;
  speed?: number;
  Wrapper?: keyof ReactHTML;
};

const Incrementor: FC<TProps> = ({ start = 0, end, speed = 100, Wrapper = 'span' }) => {
  const [count, setCount] = useState(start);

  const increment = (): NodeJS.Timer | undefined => {
    if (count >= end) return;

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, speed);

    return intervalId;
  };

  useEffect(() => {
    const intervalId = increment();

    return () => clearInterval(intervalId);
  }, [increment]);

  return <Wrapper>+{count.toLocaleString()}</Wrapper>;
};

export default Incrementor;
