import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-react'

import App from '../src/App'

describe("Test Bear Component", () => {
  it("Should render the number of bears", async () => {
      const { getByText  } = render(<App />)

      await expect.element(getByText('Zustand')).toBeInTheDocument()

  });
});
