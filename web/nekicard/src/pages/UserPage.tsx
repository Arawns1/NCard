import { useEffect, useState } from 'react'
import bgHeader from '@/assets/HeaderBgBlack.png'
import defaultUserPhoto from '@/assets/userPhotoDefault@2x.png'

import { api } from '@/services/axios'
import { UserProfileDTO } from '@/dtos/UserProfile'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { LinkSimple, Envelope, Phone } from '@phosphor-icons/react'
import ContactCard from '@/components/ContactCard'
import GithubIcon from '@/assets/githubIcon.svg'
import FacebookIcon from '@/assets/facebookIcon.svg'
import LinkedinIcon from '@/assets/linkedinIcon.svg'
import { useParams } from 'react-router-dom'
export default function UserPage() {
  const { userId } = useParams()
  const [user, setUser] = useState<UserProfileDTO>()

  useEffect(() => {
    fetchUser()
  }, [])

  const findLinkedin = user?.socialMediaList?.find(
    (item) => item.name == 'LINKEDIN'
  )?.url
  const findGithub = user?.socialMediaList?.find(
    (item) => item.name == 'GITHUB'
  )?.url
  const findFacebook = user?.socialMediaList?.find(
    (item) => item.name == 'FACEBOOK'
  )?.url

  async function fetchUser(): Promise<UserProfileDTO> {
    const response = await api.get(`/user/${userId}`)
    setUser(response.data)
    return response.data
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-700 items-center justify-center">
      <div className="w-full h-80">
        <img src={bgHeader} className="w-full h-full object-cover " />
      </div>
      <main className="flex flex-col items-center justify-center space-y-6 mt-[-65px] md:mt-[-90px]">
        <Avatar className="w-32 h-32 md:w-44 md:h-44">
          <AvatarImage src={user?.profilePhotoUrl || defaultUserPhoto} />
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-100">{user?.name}</h1>
          <h3 className="text-lg font-light text-gray-200">
            {user?.workFunction}
          </h3>
        </div>

        {user?.description && (
          <div id="aboutMe" className="w-full space-y-2">
            <h2 className="text-xl font-bold text-gray-100">Sobre Mim</h2>
            <p className="text-lg font-normal text-gray-200">
              {user?.description}
            </p>
          </div>
        )}

        <div id="myContacts" className="w-full space-y-3">
          <h2 className="text-xl font-bold tx-gray-100">Meus Contatos</h2>
          <div className=" flex flex-row items-start justify-between  sm:px-12 px-1">
            <ContactCard
              text="Meu Link"
              icon={<LinkSimple weight="regular" />}
            />
            <ContactCard
              text="Email"
              icon={
                <Envelope weight="regular" href={`mailto:${user?.email}`} />
              }
            />
            <ContactCard text="Celular" icon={<Phone weight="regular" />} />
          </div>
        </div>

        {findLinkedin ||
          findFacebook ||
          (findGithub && (
            <div id="mySocialMedias" className="w-full space-y-3">
              <h2 className="text-xl font-bold tx-gray-100">
                Minhas Redes Sociais
              </h2>
              <div className="flex flex-row items-start justify-between  sm:px-12 px-1">
                {findGithub && (
                  <ContactCard
                    variant="horizontal"
                    text="Github"
                    icon={<img src={GithubIcon} />}
                  />
                )}

                {findLinkedin && (
                  <ContactCard
                    variant="horizontal"
                    text="Linkedin"
                    icon={<img src={LinkedinIcon} />}
                  />
                )}

                {findFacebook && (
                  <ContactCard
                    variant="horizontal"
                    text="Facebook"
                    icon={<img src={FacebookIcon} />}
                  />
                )}
              </div>
            </div>
          ))}

        <div id="Details" className="w-full space-y-2">
          <h2 className="text-xl font-bold">Detalhes</h2>
          <ul className="list-none">
            <li>
              <span className="font-bold text-muted-foreground">
                Nome social:{' '}
              </span>
              <span className="font-normal text-muted-foreground">
                {user?.socialName}
              </span>
              <span className="font-bold text-muted-foreground">
                Data de Nascimento:{' '}
              </span>
              <span className="font-normal text-muted-foreground">
                {user?.birthdate}
              </span>
              <span className="font-bold text-muted-foreground">
                Localidade:{' '}
              </span>
              <span className="font-normal text-muted-foreground">
                {user?.locality}
              </span>
              <span className="font-bold text-muted-foreground">
                Tempo de Neki:{' '}
              </span>
              <span className="font-normal text-muted-foreground">
                {user?.workTime}
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
