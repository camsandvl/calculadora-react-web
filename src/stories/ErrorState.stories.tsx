import type { Meta, StoryObj } from '@storybook/react'
import { Display } from '../components/Display/Display'

const meta: Meta<typeof Display> = {
  title: 'Estados/Error',
  component: Display
}
export default meta

type Story = StoryObj<typeof Display>

export const DesbordamientoSuma: Story = {
  args: { value: 'ERROR' },
  name: 'ERROR — Suma mayor a 999,999,999'
}

export const ResultadoNegativo: Story = {
  args: { value: 'ERROR' },
  name: 'ERROR — Resta con resultado negativo'
}

export const DivisionPorCero: Story = {
  args: { value: 'ERROR' },
  name: 'ERROR — División por cero'
}
