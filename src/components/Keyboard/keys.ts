export type KeyVariant = 'number' | 'operator' | 'equals' | 'function'

export interface Key {
  label: string
  variant: KeyVariant
  wide?: boolean
}

export const KEYS: Key[][] = [
  [
    { label: 'C', variant: 'function' },
    { label: '±', variant: 'function' },
    { label: '%', variant: 'operator' },
    { label: '÷', variant: 'operator' }
  ],
  [
    { label: '7', variant: 'number' },
    { label: '8', variant: 'number' },
    { label: '9', variant: 'number' },
    { label: '×', variant: 'operator' }
  ],
  [
    { label: '4', variant: 'number' },
    { label: '5', variant: 'number' },
    { label: '6', variant: 'number' },
    { label: '−', variant: 'operator' }
  ],
  [
    { label: '1', variant: 'number' },
    { label: '2', variant: 'number' },
    { label: '3', variant: 'number' },
    { label: '+', variant: 'operator' }
  ],
  [
    { label: '0', variant: 'number', wide: true },
    { label: '.', variant: 'function' },
    { label: '=', variant: 'equals' }
  ]
]
