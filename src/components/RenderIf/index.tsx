import type { FC, ReactNode } from 'react'

type TProps = {
  if: boolean;
  children: ReactNode | FC | string;
};

const Render: FC<TProps> = ({ if: condition, children }) => {
  if (!condition) return null

  if (typeof children === 'function') return children({})

  return <>{children}</>
}

export default Render
