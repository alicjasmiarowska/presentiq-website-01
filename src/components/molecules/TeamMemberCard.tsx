import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageValue } from '@/src/types/sanity'

interface TeamMemberCardProps {
  photo?: SanityImageValue
  name: string
}

export default function TeamMemberCard({ photo, name }: TeamMemberCardProps) {
  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {photo?.asset ? (
          <Image
            src={urlFor(photo).width(800).height(800).url()}
            alt={photo.alt || name}
            fill
            sizes="(max-width: 1103px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Photo
          </div>
        )}
      </div>
      <p className="mt-4 text-lg font-semibold text-primary-dark">{name}</p>
    </div>
  )
}
