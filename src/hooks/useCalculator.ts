import { useReducer } from 'react'

export type State = {
  display: string
  prev: string | null
  op: string | null
  waiting: boolean
  isResult?: boolean
}

type Action = { type: 'KEY'; key: string }

const OPERATORS: Record<string, string> = { '÷': '/', '×': '*', '−': '-', '+': '+', '%': '%' }
const MAX_LEN = 9
const MAX_VAL = 999999999

function formatResult(n: number): string {
  let s = n.toString()
  if (s.includes('e')) s = n.toFixed(20).replace(/\.?0+$/, '')
  if (s.length <= MAX_LEN) return s
  if (!s.includes('.')) return 'ERROR'
  return s.slice(0, MAX_LEN).replace(/0+$/, '').replace(/\.$/, '') || '0'
}

export function compute(a: string, b: string, op: string): string {
  const numA = parseFloat(a)
  const numB = parseFloat(b)
  let result: number
  switch (op) {
    case '+': result = numA + numB; break
    case '-': result = numA - numB; break
    case '*': result = numA * numB; break
    case '/': result = numA / numB; break
    case '%': result = numA % numB; break
    default: return b
  }
  if (!isFinite(result) || isNaN(result)) return 'ERROR'
  if (op === '-' && result < 0) return 'ERROR'
  if ((op === '+' || op === '*') && result > MAX_VAL) return 'ERROR'
  return formatResult(result)
}

export function reducer(state: State, action: Action): State {
  const { display, prev, op, waiting } = state
  const { key } = action
  const cleared: State = { display: '0', prev: null, op: null, waiting: false, isResult: false }

  if (display === 'ERROR') {
    if (/^\d$/.test(key)) return { ...cleared, display: key }
    return cleared
  }
  if (key === 'C') return cleared
  if (key === '=') {
    if (!prev || !op || waiting) return state
    const result = compute(prev, display, op)
    return { ...cleared, display: result, isResult: result !== 'ERROR' }
  }
  if (key === '.') {
    if (waiting) return { ...state, display: '0.', waiting: false, isResult: false }
    if (display.includes('.') || display.length >= MAX_LEN) return state
    return { ...state, display: display + '.', isResult: false }
  }
  if (key === '±') {
    if (display === '0') return state
    if (display.startsWith('-')) return { ...state, display: display.slice(1), isResult: false }
    return display.length < MAX_LEN ? { ...state, display: '-' + display, isResult: false } : state
  }
  if (key in OPERATORS) {
    const mappedOp = OPERATORS[key]
    if (prev !== null && !waiting) {
      const res = compute(prev, display, op!)
      return { display: res, prev: res === 'ERROR' ? null : res, op: mappedOp, waiting: true, isResult: false }
    }
    return { ...state, prev: display, op: mappedOp, waiting: true, isResult: false }
  }
  if (waiting) return { ...state, display: key, waiting: false, isResult: false }
  if (display === '0') return { ...state, display: key, isResult: false }
  return display.length < MAX_LEN ? { ...state, display: display + key, isResult: false } : state
}

const initial: State = { display: '0', prev: null, op: null, waiting: false, isResult: false }

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initial)
  const handleKey = (key: string) => dispatch({ type: 'KEY', key })
  return { display: state.display, handleKey, isResult: state.isResult ?? false }
}
