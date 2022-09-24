import type { FC, ReactElement } from 'react'

type TProps = {
  if: boolean;
  children: ReactElement | FC;
};

const Render: FC<TProps> = ({ if: condition, children }) => {
  if (!condition) return null

  if (typeof children === 'function') return children({})

  return children
}

export default Render
