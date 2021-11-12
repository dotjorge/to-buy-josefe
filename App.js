import React, { useContext } from "react"
import { NativeBaseProvider, useColorModeValue, extendTheme } from "native-base"

import { NavigationContainer } from "@react-navigation/native"
import { View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

// Screens
import ToBuy from "./src/screens/ToBuy"
import Cart from "./src/screens/Cart"
import AddItem from "./src/screens/AddItem"

// Context
import ItemsProvider, { Items } from "./src/context/Items"

const Tab = createBottomTabNavigator()

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

// Extend the theme
const customTheme = extendTheme({ config })

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <ItemsProvider>
        <Screens />
      </ItemsProvider>
    </NativeBaseProvider>
  )
}

function Screens() {
  const { colors } = customTheme
  const activeColor = useColorModeValue(colors.green[400], colors.green[900])
  const inactiveColor = useColorModeValue(colors.light[600], colors.green[400])
  const { itemsAddedBadge, tasksDoneBadge } = useContext(Items)

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName
            if (route.name === "To buy") {
              iconName = "apps"
            } else if (route.name === "Cart") {
              iconName = "cart"
            } else if (route.name === "Add task") {
              iconName = "add-circle"
            }
            return (
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={iconName}
                  size={route.name === "Add task" ? 80 : 35}
                  color={color}
                  style={[route.name === "Add task" && { marginTop: -40 }]}
                />
                {/* Temp gambiarra */}
                {route.name === "Add task" && (
                  <View
                    style={[
                      {
                        position: "absolute",
                        top: -50,
                        height: 40,
                        overflow: "hidden",
                        zIndex: -1,
                      },
                      { transform: [{ scale: 1.2 }] },
                    ]}>
                    <Ionicons name={iconName} size={80} color={"#f2f2f2"} />
                  </View>
                )}
              </View>
            )
          },
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="To buy"
          component={ToBuy}
          options={{
            tabBarBadge: itemsAddedBadge,
            tabBarBadgeStyle: {
              backgroundColor: colors.green[50],
              color: colors.green[900],
              opacity: itemsAddedBadge > 0 ? 1 : 0,
            },
          }}
        />
        <Tab.Screen name="Add task" component={AddItem} />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarBadge: tasksDoneBadge,
            tabBarBadgeStyle: {
              backgroundColor: colors.green[50],
              color: colors.green[900],
              opacity: tasksDoneBadge > 0 ? 1 : 0,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
