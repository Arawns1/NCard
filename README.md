# Projeto NekiCard

![https://neki-card.vercel.app/](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![https://neki-card.onrender.com/swagger-ui/](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<p align="center"> Aplicativo e site para comunicação entre funcionários utilzando o NekiCard </p>

# 🛠 Tecnologias Utilizadas

- React
- React Native
- Expo
- Spring Boot
- Tailwind css
- Shadcn/ui
- TypeScript
- Native Base
- React Hook Form
- Yup
- Spring Security
- Tokens JWT
- Lombok
- Docker
- Github Actions
- Neon DB
- Figma

# 🎯 Objetivo Principal

O principal objetivo deste projto foi a criação de um site, aplicativo e API completa durante uma semana para a facilitar a comunicação dos colaboradores; Além disso foi implentado um fluxo de CI/CD Utilizando Docker, Github Actions, Render, Neon DB e Vercel.

## 📄 Documentação e casos de Uso
[Link para a documentação](https://github.com/Arawns1/NekiCard/tree/main/docs)

## 🎲 Modelagem do Banco de Dados

```mermaid 
classDiagram
    class User {
        <<Entity>>
        - USER_CD_ID: UUID
        - USER_BOOL_STATUS: boolean
        - USER_TX_NAME: String
        - USER_TX_EMAIL: String
        - USER_TX_PASSWORD: String
        - USER_DT_BIRTHDATE: LocalDate
        - USER_TX_LOCALITY: String
        - USER_TX_DESCRIPTION: String
        - USER_TX_WORKTIME: LocalDate
        - USER_TX_WORKFUNCTION: String
        - USER_TX_SOCIALNAME: String
        - USER_TX_PHONE: String
        - USER_TX_PROFILE_PHOTO_URL: String
        - CREATED_AT: LocalDateTime
        - UPDATED_AT: LocalDateTime
        - USER_TX_ROLE: UserRole
        + updateInfos(dto: UpdateUserDTO): User
        + excluir(): void
    }

    class Card {
        <<Entity>>
        - CARD_CD_ID: UUID
        - CARD_BOOL_STATUS: boolean
        - CARD_CD_NFC_ID: String
        - CARD_TX_TYPE: CardType
        - CARD_TX_QRCODE_URL: String
        + excluir(): void
    }

    class SocialMedia {
        <<Entity>>
        - SOME_CD_ID: UUID
        - SOME_BOOL_STATUS: boolean
        - SOME_TX_NAME: SocialMediaNames
        - SOME_TX_URL: String
        + update(dto: SaveSocialMediaDTO): void
        + excluir(): void
    }

    class UserPhoto {
        <<Entity>>
        - USER_CD_ID: UUID
        - USPH_BL_PHOTO: byte[]
        - USPH_TX_TYPE: String
        - USPH_TX_SIZE: Long
    }

    class UserRole {
        <<Enum>>
        - ROLE: String
    }

    class CardType {
        <<Enum>>
        - TYPE: String
    }

    class SocialMediaNames {
        <<Enum>>
        - NAME: String
    }


  User --|> Card
  User --|> SocialMedia
  User --o UserPhoto
  UserRole --o User
  CardType --o Card
  SocialMediaNames --o SocialMedia


```

# 📸 Visuais e Telas
🎨 [Link para o figma](https://www.figma.com/file/Uh49GkN8efqS4LLaptQOgB/Testes?type=design&node-id=1%3A3&mode=design&t=u1a0WA6YX6nzMndj-1)




## 💻 Como Rodar?

1. Clone o repositório
```bash
git clone https://github.com/Arawns1/NekiCard.git
```
2. Utilize o docker compose para subir a instancia de Banco de dados e API
```bash
    docker-compose up -d
```
3. Entre no diretório e rode
```bash
  npm install 
```
4. Altere o arquivo .ENV para o url de sua API para ```http://localhost:8082/```


5. Rode o projeto
```bash
  npm run dev
```
Por padrão o projeto web possui apenas a rota /user/{userId} que busca os dados do usuário
