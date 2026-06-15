import { BaseLayout } from '@/layout'
import type * as types from './type'

export const Form = (props: types.ConfigProp) => {
  return (
    <BaseLayout footer={props.renderFooter()}>
      <form onSubmit={props.onSubmit} className="space-y-4">
        {props.renderBody()}
      </form>
    </BaseLayout>
  )
}
