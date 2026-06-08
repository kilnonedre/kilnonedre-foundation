import { LucideIcon } from 'lucide-react'

export interface ConfigNavProduct {
  name: string
  url: string
  icon: LucideIcon
}

export interface ConfigProp {
  projects: Array<ConfigNavProduct>
}
