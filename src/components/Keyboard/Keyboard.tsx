import { Button } from '../Button/Button'
import styles from './Keyboard.module.css'
import { KEYS } from './keys'

type KeyboardProps = { onKey: (key: string) => void }

export function Keyboard({ onKey }: KeyboardProps) {
  return (
    <div className={styles.keyboard} aria-label="Teclado de la calculadora">
      {KEYS.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map(({ label, variant, wide }) => (
            <Button key={label} label={label} onClick={() => onKey(label)} variant={variant} wide={wide} />
          ))}
        </div>
      ))}
    </div>
  )
}
