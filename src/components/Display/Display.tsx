import styles from './Display.module.css'

interface DisplayProps { value: string; isResult?: boolean }

export function Display({ value, isResult = false }: DisplayProps) {
  const isError = value === 'ERROR'
  return (
    <div className={`${styles.display} ${isError ? styles.error : ''}`} role="status" aria-live="polite">
      <span key={value} className={`${styles.value} ${isResult ? styles.pop : ''}`}>{value}</span>
    </div>
  )
}
