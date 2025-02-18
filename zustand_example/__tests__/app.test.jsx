import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-react'

import App from '../src/App'

describe("Test Bear Component", () => {
  it("Should render the number of bears", async () => {
      const { getByText, getByRole  } = render(<App />)

      await expect.element(getByText('Zustand')).toBeInTheDocument()

      await getByRole('button', { name: 'Eat'}).click()
      await expect.element(getByText('Hunger: 10')).toBeInTheDocument()
      await expect.element(getByText('Fish: 9')).toBeInTheDocument()
  });
});
