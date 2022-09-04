import { Suspense, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '../../components'
import { useAppSelector } from '../../hooks'

import getRoutes from './routes'

export default function AllRoute() {
  const { features, isStripe } = useAppSelector(({ ong }) => ({
    features: ong.ongConfig?.features || {} as TFeatures,
    isStripe: ong.ongConfig?.platformConfig.payment_method === 'stripe',
  }))

  const ROUTES = useMemo(() => getRoutes({ features, isStripe }), [features, isStripe])

  const MEMOIZED_ROUTES = useMemo(() => ROUTES.map(
    ({ path, render, Element }) => render && <Route key={path} path={path} element={<Element />} />
  ), [ROUTES])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>{MEMOIZED_ROUTES}</Routes>
    </Suspense>
  )
}
