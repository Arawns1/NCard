import { useEffect, useState } from 'react'
import defaultUserPhoto from '@/assets/userPhotoDefault@2x.png'
import HeaderBgBlue from '@/assets/HeaderBgBlue.png'
import HeaderBgDarkBlue from '@/assets/HeaderBgDarkBlue.png'
import HeaderBgBlack from '@/assets/HeaderBgBlack.png'
import { api } from '@/services/axios'
import { UserProfileDTO } from '@/dtos/UserProfile'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { LinkSimple, Envelope, Phone } from '@phosphor-icons/react'
import ContactCard from '@/components/ContactCard'
import GithubIcon from '@/assets/githubIcon.svg'
import FacebookIcon from '@/assets/facebookIcon.svg'
import LinkedinIcon from '@/assets/linkedinIcon.svg'
import { useParams } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
export default function UserPage() {
  const { userId } = useParams()
  const [user, setUser] = useState<UserProfileDTO>()
  const [headerPhoto, setHeaderPhoto] = useState(HeaderBgBlack)

  useEffect(() => {
    fetchUser()
    fetchHeaderPhoto()
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
  const fetchHeaderPhoto = async () => {
    const type = user?.cardList?.at(0)?.type || 'BLUE'
    switch (type) {
      case 'DARK_BLUE':
        setHeaderPhoto(HeaderBgDarkBlue)
        break
      case 'BLACK':
        setHeaderPhoto(HeaderBgBlack)
        break
      default:
        setHeaderPhoto(HeaderBgBlue)
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-700 items-center justify-center pb-10">
      <div className="w-full h-80">
        <img src={headerPhoto} className="w-full h-full object-cover " />
      </div>
      <main className="flex flex-col items-center justify-center space-y-6 mt-[-65px] md:mt-[-90px]">
        <Avatar className="w-32 h-32 md:w-44 md:h-44 border-zinc-900 border-4">
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

        <div id="myContacts" className="w-full space-y-3 ">
          <h2 className="text-xl font-bold tx-gray-100">Meus Contatos</h2>
          <div className=" flex flex-row items-start justify-between   px-1">
            <ContactCard
              link={`${window.location.origin.toString()}/user/${userId}`}
              text="Meu Link"
              canCopy
              icon={<LinkSimple weight="regular" />}
            />
            <ContactCard
              link={`mailto:${user?.email}`}
              text="Email"
              icon={<Envelope weight="regular" />}
            />
            <ContactCard
              link={`tel:${user?.phone}`}
              text="Celular"
              icon={<Phone weight="regular" />}
            />
          </div>
        </div>
        {findLinkedin || findFacebook || findGithub ? (
          <div id="mySocialMedias" className="w-full space-y-3">
            <h2 className="text-xl font-bold tx-gray-100">
              Minhas Redes Sociais
            </h2>
            <div className="flex flex-row items-start justify-between   px-1 ">
              {findGithub ? (
                <ContactCard
                  variant="horizontal"
                  text="Github"
                  link={findGithub}
                  icon={<img src={GithubIcon} />}
                />
              ) : null}

              {findLinkedin ? (
                <ContactCard
                  variant="horizontal"
                  text="Linkedin"
                  link={findLinkedin}
                  icon={<img src={LinkedinIcon} />}
                />
              ) : null}

              {findFacebook ? (
                <ContactCard
                  variant="horizontal"
                  text="Facebook"
                  link={findFacebook}
                  icon={<img src={FacebookIcon} />}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        <div id="Details" className="w-full space-y-2">
          <h2 className="text-xl font-bold">Detalhes</h2>
          <ul className="list-none flex flex-col items-start">
            <li>
              <span className="font-bold text-muted-foreground">
                Nome social:{' '}
              </span>
              <span className="font-normal text-muted-foreground">
                {user?.socialName}
              </span>
            </li>
            <li>
              <span className="font-bold text-muted-foreground">
                Data de Nascimento:{' '}
              </span>
              <span className="font-normal text-muted-foreground">
                {user?.birthdate}
              </span>
            </li>

            <li>
              {' '}
              <span className="font-bold text-muted-foreground">
                Localidade:{' '}
              </span>
              <span className="font-normal text-muted-foreground">
                {user?.locality}
              </span>
            </li>
            <li>
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
      <Toaster />
    </div>
  )
}
