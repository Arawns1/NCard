import { Image, IImageProps, Skeleton } from 'native-base'
import React, { useEffect } from 'react'

type UserPhotoProps = IImageProps & {
  size: number
  isLoading?: boolean
}

export default function UserPhotoSelect({
  size,
  isLoading = false,
  ...rest
}: UserPhotoProps) {
  useEffect(() => {
    'PORRA!'
  }, [])

  if (isLoading) {
    return (
      <Skeleton
        w={size}
        h={size}
        rounded="full"
        startColor={'gray.500'}
        endColor={'gray.400'}
      />
    )
  }
  return (
    <Image
      w={size}
      h={size}
      rounded={'full'}
      {...rest}
      borderWidth={2}
      borderColor={'gray.400'}
    />
  )
}
