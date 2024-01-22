import { SocialMedia } from './SocialMedia'

export interface updateUserDTO {
  locality?: string
  description?: string
  worktime?: string
  workFunction?: string
  socialName?: string
  phone?: string
  mediaSocialList?: SocialMedia[]
}
