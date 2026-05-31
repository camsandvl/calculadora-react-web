import styles from './Button.module.css'

interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'number' | 'operator' | 'equals' | 'function'
  wide?: boolean
}

export function Button({ label, onClick, variant = 'number', wide = false }: ButtonProps) {
  const cls = [styles.button, styles[variant], wide ? styles.wide : ''].join(' ')
  return (
    <button className={cls} onClick={onClick} aria-label={`Tecla ${label}`}>
      {label}
    </button>
  )
}
