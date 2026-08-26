import Image from 'next/image'
import { urlFor } from '../../../sanity/lib/image'

interface TeamMemberCardProps {
  photo?: any
  name: string
}

export default function TeamMemberCard({ photo, name }: TeamMemberCardProps) {
  return (
    <div>
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-100">
        {photo?.asset ? (
          <Image
            src={urlFor(photo).width(600).height(800).url()}
            alt={photo.alt || name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
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
