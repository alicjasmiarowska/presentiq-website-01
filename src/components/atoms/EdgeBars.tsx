import Image from 'next/image'

// The thin bar graphic that sits along the left edge of a navy column
// (contact page, About intro): 169×574 at 1440px, with a third of it tucked
// past the viewport edge. The parent needs `relative overflow-hidden`.
export default function EdgeBars() {
  return (
    <Image
      src="/images/line-04.png"
      alt=""
      aria-hidden="true"
      width={318}
      height={1080}
      className="absolute left-0 -top-[7px] -translate-x-[44.4%] w-[min(11.7vw,169px)] min-w-24 h-auto pointer-events-none select-none"
    />
  )
}
