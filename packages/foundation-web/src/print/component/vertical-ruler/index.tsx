import type * as types from './type'

const VerticalRuler = (props: types.ConfigProp) => {
  const marks = []

  for (let i = 0; i <= props.height; i += 10) {
    marks.push(i)
  }

  return (
    <div className="absolute left-0 top-8 bottom-0 w-8 border-r border-slate-300 bg-slate-50">
      {marks.map(mark => (
        <div
          key={mark}
          className="absolute left-4.5 w-2.5 border-t border-slate-400 text-[10px] text-slate-500"
          style={{
            top: mark * props.scale,
          }}
        >
          <span className="absolute top-0.5 -left-4 origin-center -rotate-90">
            {mark}
          </span>
        </div>
      ))}
    </div>
  )
}

export default VerticalRuler
