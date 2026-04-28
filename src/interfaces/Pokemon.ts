export interface Pokemon {
  id?: string
  name: string
  image?: string
  initialMove: string
  tricks: Tricks[]
}

export interface Tricks {
  detail: string
  variant?: Tricks[]
}
