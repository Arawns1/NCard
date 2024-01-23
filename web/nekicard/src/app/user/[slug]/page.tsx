import { UserProfileDTO } from '@/data/types/UserProfileDTO'
import React from 'react'

export async function getUser(slug: string): Promise<UserProfileDTO> {}

interface UserProps {
  params: {
    slug: string
  }
}
export default async function UserPage({ params }: UserProps) {
  const user = await getUser(params.slug)
  return <div>User page!</div>
}
