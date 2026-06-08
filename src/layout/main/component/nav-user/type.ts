export interface ConfigProp {
  username?: string
  email?: string
  avatarUrl?: string
  fallbackText?: string

  onProfile?: () => void
  onNotification?: () => void
  onLogout?: () => void
}
