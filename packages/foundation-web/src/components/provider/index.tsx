import { TooltipProvider } from '@/shadcn/components/tooltip'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <TooltipProvider>{children}</TooltipProvider>
}
