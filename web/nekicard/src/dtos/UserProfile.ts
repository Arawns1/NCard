import { Card } from './Card'
import { SocialMedia } from './SocialMedia'

export interface UserProfileDTO {
  id: string
  status: boolean
  name: string
  email: string
  birthdate: string
  profilePhotoUrl?: string
  locality?: string
  description?: string
  workTime?: string
  workFunction?: string
  socialName?: string
  phone?: string
  cardList?: Card[]
  socialMediaList?: SocialMedia[]
}
