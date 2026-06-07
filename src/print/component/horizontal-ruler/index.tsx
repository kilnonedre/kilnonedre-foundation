import type * as types from './type'

const HorizontalRuler = (props: types.ConfigProp) => {
  const marks = []

  for (let i = 0; i <= props.width; i += 10) {
    marks.push(i)
  }

  return (
    <div className="absolute left-8 top-0 right-0 h-8 border-b border-slate-300 bg-slate-50">
      {marks.map(mark => (
        <div
          key={mark}
          className="absolute top-4.5 h-2.5 border-l border-slate-400 text-[10px] text-slate-500"
          style={{
            left: mark * props.scale,
          }}
        >
          <span className="absolute -top-4 left-0.5">{mark}</span>
        </div>
      ))}
    </div>
  )
}

export default HorizontalRuler
