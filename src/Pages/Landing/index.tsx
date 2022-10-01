/* eslint-disable react/no-children-prop */
import { useEffect, type ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { useAllPlatformConfig } from 'hooks'
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
  SubscribeDivider
} from 'components'

export default function Landing(): ReactElement {
  const sectionHashId = useLocation().hash as `#${string}`

  const { features } = useAllPlatformConfig()
  const {
    causes = false,
    courses = false,
    events = false,
    impact = false,
    logos = false,
    partners = false,
    volunteers = false,
  } = features || {}

  useEffect(() => {
    if (sectionHashId) {
      const element = document.querySelector(sectionHashId)
      if (element) {
        element.scrollIntoView()
      }
    }
  }, [sectionHashId])

  return (
    <>
      <Navbar transparent position="fixed" />
      <Hero />
      <AboutUs />
      <RenderIf if={logos} children={<LogosCarousel />} />
      <RenderIf if={causes} children={<Projects />} />
      <RenderIf if={events} children={<PremiumEvent />} />
      <RenderIf if={impact} children={<SocialImpact />} />
      <RenderIf if={events} children={<Events />} />
      <RenderIf if={partners} children={<SubscribeDivider />} />
      <RenderIf if={courses} children={<Courses />} />
      <RenderIf if={volunteers} children={<Volunteers />} />
      <Footer />
    </>
  )
}
