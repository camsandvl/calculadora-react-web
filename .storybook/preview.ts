import '../src/styles/tokens.css'
import '../src/styles/global.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'pergamino',
      values: [
        { name: 'pergamino', value: '#f5f0e8' },
        { name: 'oscuro', value: '#1a1a1a' },
      ],
    },
  },
}

export default preview
