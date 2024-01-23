import { useEffect, useState } from 'react'
import bgHeader from '@/assets/HeaderBgBlack.png'
import defaultUserPhoto from '@/assets/userPhotoDefault@2x.png'
import './App.css'
import { api } from './services/axios'
import { UserProfileDTO } from './dtos/UserProfile'
import { Avatar, AvatarImage } from './components/ui/avatar'
;`
`
function App() {
  const [user, setUser] = useState<UserProfileDTO>()

  useEffect(() => {
    fetchUser()
  })

  async function fetchUser(): Promise<UserProfileDTO> {
    const response = await api.get('/user/ec3abc0c-b1c9-48d8-b423-b8333339c427')
    console.log(response.data)
    return response.data
  }

  return (
    <div className="w-full bg-red-500 items-center justify-center">
      <img src={bgHeader} />
      <Avatar>
        <AvatarImage src={user?.profilePhotoUrl || defaultUserPhoto} />
      </Avatar>
    </div>
  )
}

export default App
