import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-react'

import { Bear, Fish } from '../src/components'

describe("Test Bear Component", () => {
  it("Should render the number of bears", async () => {
      const { getByText, getByRole  } = render(<Bear />)

      // Check of bears is loaded and equal to initial value
      await expect.element(getByText('Number of bears: 0')).toBeInTheDocument()
      // find increment button and click it
      await getByRole('button', { name: 'Increase'}).click()
      // check does value actually increasing
      await expect.element(getByText('Number of bears: 1')).toBeInTheDocument()
      await getByRole('button', { name: 'Reset'}).click()
  });
});


