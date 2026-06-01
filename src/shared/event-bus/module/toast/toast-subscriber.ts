import { toast } from 'sonner'
import { eventBus } from '@/shared/event-bus'
import {
  ConfigApiErr,
  ConfigHttpErr,
  ConfigHttpUnauth,
} from '@/shared/event-bus/type'

const errMessageObj = {
  400: '请求错误(400)',
  401: '登录已过期，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
}

const errMessage = (status: number) => {
  const message =
    errMessageObj[status as keyof typeof errMessageObj] ?? `连接出错(${status})`
  return `${message}，请检查网络或联系管理员！`
}

export const registerToastSubscriber = () => {
  const onHttpUnauth = ({ status }: ConfigHttpUnauth) => {
    toast.error(errMessage(status))
  }

  const onHttpErr = ({ status }: ConfigHttpErr) => {
    toast.error(errMessage(status))
  }

  const onApiErr = ({ msg }: ConfigApiErr) => {
    toast.error(msg)
  }

  eventBus.on('HTTP:UNAUTH', onHttpUnauth)
  eventBus.on('HTTP:ERR', onHttpErr)
  eventBus.on('API:ERR', onApiErr)

  return () => {
    eventBus.off('HTTP:UNAUTH', onHttpUnauth)
    eventBus.off('HTTP:ERR', onHttpErr)
    eventBus.off('API:ERR', onApiErr)
  }
}
