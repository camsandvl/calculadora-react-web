import type { Meta, StoryObj } from '@storybook/react'
import { Display } from './Display'

const meta: Meta<typeof Display> = {
  title: 'Components/Display',
  component: Display
}
export default meta

type Story = StoryObj<typeof Display>

export const Vacio: Story = { args: { value: '0' }, name: 'Vacío (0)' }
export const NumeroCorto: Story = { args: { value: '42' } }
export const NumeroLargo: Story = { args: { value: '123456789' }, name: 'Número largo (9 dígitos)' }
export const Decimal: Story = { args: { value: '3.1428571' }, name: 'Número decimal' }
export const Error: Story = { args: { value: 'ERROR' }, name: 'Estado ERROR' }
