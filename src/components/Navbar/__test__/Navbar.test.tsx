import { describe, expect, it } from 'vitest'
import { render } from 'testSetup/test-utils'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('Should match navbar snapshot', async () => {
    const { asFragment } = render(<Navbar />)

    expect(asFragment()).toMatchSnapshot()
  })
})
