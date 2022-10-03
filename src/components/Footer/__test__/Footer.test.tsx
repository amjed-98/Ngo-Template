import { render } from 'testSetup/test-utils';
import { describe, expect, it } from 'vitest';
import Footer from '../Footer';

describe('Accordion test', () => {
  it('should match footer snapshot', async () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
