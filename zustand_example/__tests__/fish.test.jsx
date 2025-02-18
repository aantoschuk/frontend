
import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-react'

import {  Fish } from '../src/components'

describe("Test Fish Component", () => {
    it("Should render the number of fishes", async () => {
        const { getByText, getByRole  } = render(<Fish />)
        await expect.element(getByText('Fish: 10')).toBeInTheDocument()
    })
})
