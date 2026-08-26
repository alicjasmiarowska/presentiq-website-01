import Image from 'next/image'
import Text from '../atoms/Text'
import { urlFor } from '../../../sanity/lib/image'

interface PillarCardProps {
  image?: any
  title: string
  description: string
}

export default function PillarCard({ image, title, description }: PillarCardProps) {
  return (
    <div className="h-full text-left text-white border border-white/20 rounded-2xl pt-6 pb-8 px-8 bg-gradient-to-b from-primary-blue to-primary-dark">
      <div className="flex items-center justify-between gap-4 mb-10">
        <h3 className="min-w-0 text-2xl font-bold leading-[1.2] hyphens-auto wrap-break-word">
          {title}
        </h3>
        {image?.asset && (
          <div className="h-16 w-16 shrink-0 relative">
            <Image
              src={urlFor(image).width(120).url()}
              alt={image.alt || title}
              fill
              sizes="60px"
              className="object-contain"
            />
          </div>
        )}
      </div>
      <Text
        text={description}
        size="base"
      />
    </div>
  )
}