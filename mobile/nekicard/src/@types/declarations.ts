//Tipagem de PNG
declare module '*.png'
declare module '*.jpg'

//Tipagem de SVG
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
