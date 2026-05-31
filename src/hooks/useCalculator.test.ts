import { describe, it, expect } from 'vitest'
import { reducer, compute, type State } from './useCalculator'

const initial: State = { display: '0', prev: null, op: null, waiting: false }
const k = (key: string) => ({ type: 'KEY' as const, key })

function press(keys: string[], from = initial): State {
  return keys.reduce((s, key) => reducer(s, k(key)), from)
}

describe('Calculadora — reducer', () => {
  it('concatena dígitos en el display', () => {
    expect(press(['1', '2', '3']).display).toBe('123')
  })

  it('ignora dígitos después del noveno carácter', () => {
    const state = press(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
    expect(state.display.length).toBe(9)
    expect(state.display).toBe('123456789')
  })

  it('resta con resultado negativo muestra ERROR', () => {
    expect(press(['3', '−', '5', '=']).display).toBe('ERROR')
  })

  it('suma mayor a 999999999 muestra ERROR', () => {
    const state = press(['9', '9', '9', '9', '9', '9', '9', '9', '9', '+', '1', '='])
    expect(state.display).toBe('ERROR')
  })

  it('presionar operador calcula resultado parcial del anterior', () => {
    const state = press(['5', '+', '3', '×'])
    expect(state.display).toBe('8')
    expect(state.op).toBe('*')
    expect(state.waiting).toBe(true)
  })

  it('división larga se trunca a máximo 9 caracteres (22÷7)', () => {
    const state = press(['2', '2', '÷', '7', '='])
    expect(state.display.length).toBeLessThanOrEqual(9)
    expect(state.display.startsWith('3.142857')).toBe(true)
  })

  it('punto decimal no puede ingresarse dos veces en el mismo número', () => {
    const state = press(['1', '.', '5', '.', '3'])
    expect(state.display).toBe('1.53')
    expect((state.display.match(/\./g) ?? []).length).toBe(1)
  })

  it('+/- convierte número positivo a negativo', () => {
    expect(press(['5', '±']).display).toBe('-5')
  })

  it('+/- vuelve a positivo si ya es negativo', () => {
    expect(press(['5', '±', '±']).display).toBe('5')
  })

  it('módulo calcula el residuo correctamente', () => {
    expect(press(['1', '0', '%', '3', '=']).display).toBe('1')
  })

  it('C limpia display y reinicia el estado completo', () => {
    const state = press(['5', '+', '3', 'C'])
    expect(state.display).toBe('0')
    expect(state.prev).toBeNull()
    expect(state.op).toBeNull()
    expect(state.waiting).toBe(false)
  })

  it('después de ERROR cualquier tecla reinicia', () => {
    const afterError = press(['3', '−', '9', '='])
    expect(afterError.display).toBe('ERROR')
    const recovered = press(['5'], afterError)
    expect(recovered.display).toBe('5')
  })
})

describe('compute — función auxiliar', () => {
  it('suma correctamente', () => expect(compute('3', '4', '+')).toBe('7'))
  it('división por cero retorna ERROR', () => expect(compute('5', '0', '/')).toBe('ERROR'))
  it('multiplicación con desbordamiento retorna ERROR', () => {
    expect(compute('999999999', '2', '*')).toBe('ERROR')
  })
})
