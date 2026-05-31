import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: () => {} }
}
export default meta

type Story = StoryObj<typeof Button>

export const Numero: Story = { args: { label: '7', variant: 'number' } }
export const Operador: Story = { args: { label: '+', variant: 'operator' } }
export const Igual: Story = { args: { label: '=', variant: 'equals' } }
export const Funcion: Story = { args: { label: 'C', variant: 'function' } }
export const Ancho: Story = { args: { label: '0', variant: 'number', wide: true }, name: 'Número Ancho (0)' }
