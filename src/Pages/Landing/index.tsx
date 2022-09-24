/* eslint-disable react/no-children-prop */
import { useEffect, type ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'hooks'
import {
  Hero,
  Events,
  AboutUs,
  LogosCarousel,
  PremiumEvent,
  Projects,
  SocialImpact,
  Volunteers,
  Courses,
  Navbar,
  Footer,
  RenderIf,
} from 'components'

export default function Landing(): ReactElement {
  const { hash } = useLocation()
  const {
    causes = false,
    events = false,
    partners = false,
    volunteers = false,
    courses = false,
    impact = false,
    logos = false,
  } = useAppSelector(({ ong }) => ong.ongConfig?.features) || {}

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1))
      if (element) {
        element.scrollIntoView()
      }
    }
  }, [hash])

  return (
    <>
      <Navbar transparent position="fixed" />
      <Hero />
      <AboutUs />
      <RenderIf if={logos} children={LogosCarousel} />
      <RenderIf if={causes} children={Projects} />
      <RenderIf if={events} children={PremiumEvent} />
      <RenderIf if={impact} children={SocialImpact} />
      <RenderIf if={events} children={Events} />
      <RenderIf if={partners} children={Events} />
      <RenderIf if={courses} children={Courses} />
      <RenderIf if={volunteers} children={Volunteers} />
      <Footer />
    </>
  )
}
