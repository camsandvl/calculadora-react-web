import type { Meta, StoryObj } from '@storybook/react'
import { Keyboard } from './Keyboard'

const meta: Meta<typeof Keyboard> = {
  title: 'Components/Keyboard',
  component: Keyboard
}
export default meta

type Story = StoryObj<typeof Keyboard>

export const Default: Story = {
  args: { onKey: (key: string) => console.log('Tecla:', key) },
  name: 'Teclado completo'
}
