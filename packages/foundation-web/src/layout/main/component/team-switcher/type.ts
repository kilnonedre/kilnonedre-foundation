import { ElementType } from 'react'

export interface ConfigNavTeam {
  name: string
  logo: ElementType
  plan: string
}

export interface ConfigProp {
  teams: Array<ConfigNavTeam>
}
