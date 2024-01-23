import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <div className="flex flex-row space-y-5">
        <Card className="w-80 ">
          <CardHeader className="flex flex-col justify-center items-center space-x-2">
            <img
              src="https://github.com/Arawns1.png"
              alt="Gabriel Damico"
              width={80}
            />
            <CardTitle>Gabriel Damico</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex justify-between ">
            <Button variant={'outline'}>Editar Perfil</Button>
            <Button>Ver Perfil</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
