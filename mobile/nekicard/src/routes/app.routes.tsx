import React from 'react'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import Home from '@screens/Home'
import { Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
import Settings from '@screens/Settings'
import Search from '@screens/Search'
import EditProfile from '@screens/EditProfile'

type TabNavigation = {
  home: undefined
  search: undefined
  settings: undefined
}

export type TabTypes = BottomTabNavigationProp<TabNavigation>
export default function TabRoutes() {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4AC3C6',
        tabBarInactiveTintColor: '#E1E1E6',
        tabBarStyle: {
          backgroundColor: '#29292E',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Feather} name="home" color={color} size={size} />
          ),
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Feather} name="search" color={color} size={size} />
          ),
          tabBarLabel: 'Pesquisar',
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Feather} name="settings" color={color} size={size} />
          ),
          tabBarLabel: 'Configurações',
        }}
      />
    </Tab.Navigator>
  )
}
