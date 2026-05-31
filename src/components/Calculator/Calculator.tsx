import { Display } from '../Display/Display'
import { Keyboard } from '../Keyboard/Keyboard'
import { useCalculator } from '../../hooks/useCalculator'
import styles from './Calculator.module.css'

export function Calculator() {
  const { display, handleKey, isResult } = useCalculator()
  return (
    <div className={styles.calculator} role="application" aria-label="CalcArt — Calculadora">
      <Display value={display} isResult={isResult} />
      <Keyboard onKey={handleKey} />
    </div>
  )
}
