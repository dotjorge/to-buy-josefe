import React, { useContext, useEffect } from "react"
import {
  IconButton,
  Checkbox,
  Text,
  Box,
  Button,
  VStack,
  HStack,
  Icon,
  Center,
  Spacer,
  FlatList,
} from "native-base"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { Items } from "../../context/Items"
import { useIsFocused } from "@react-navigation/native"
import SafeAreaView from "../../components/SafeAreaView"

export default function Cart({ navigation }) {
  const { items, cartItems, handleDelete, handleStatusChange, resetCartItemsBadge } =
    useContext(Items)

  // When screen is loaded/selected
  const screenIsLoaded = useIsFocused()
  useEffect(() => {
    if (screenIsLoaded) {
      resetCartItemsBadge()
    }
  }, [screenIsLoaded])

  return (
    <SafeAreaView>
      <Center style={{ padding: 20 }} flex={1}>
        <FlatList
          style={{ width: "100%", borderRadius: 20 }}
          extraData={items}
          data={cartItems}
          ListHeaderComponent={() => (
            <>
              {cartItems.length < 1 && (
                <Box
                  flex={1}
                  alignItems="stretch"
                  p="8"
                  marginX={"auto"}
                  maxW={"xl"}
                  width={"full"}>
                  <Text mx="2">There's nothing on your cart</Text>
                  <Button
                    colorScheme="green"
                    mt="5"
                    leftIcon={<Icon as={Ionicons} name="arrow-back" size="xs" />}
                    onPress={() => {
                      navigation.navigate("To do")
                    }}>
                    Get something
                  </Button>
                </Box>
              )}
            </>
          )}
          renderItem={({ item, index }) => (
            <HStack
              space={3}
              justifyContent="space-between"
              w="100%"
              bgColor={"green.50"}
              style={[
                {
                  padding: 20,
                },
                index === 0 && {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
                index === cartItems.length - 1 && {
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
                index.length === 1 && {
                  borderRadius: 20,
                },
              ]}
              justifyContent="space-between"
              alignItems="center">
              <Checkbox
                colorScheme="green"
                ariaLabel={"Send back to the list"}
                isChecked={item.isOnCart}
                onChange={() => handleStatusChange(item.id, "undo")}>
                {" "}
              </Checkbox>
              <VStack>
                <Text
                  _dark={{
                    color: "green.900",
                  }}
                  color="green.400"
                  bold>
                  {item.title}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "light.200",
                  }}>
                  {item.description}
                </Text>
              </VStack>
              <Spacer />
              <IconButton
                ariaLabel={"Remove item"}
                size="sm"
                colorScheme="trueGray"
                icon={<Icon as={Ionicons} name="trash" size="sm" color="green.300" />}
                onPress={() => handleDelete(item.id)}
              />
            </HStack>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Center>
    </SafeAreaView>
  )
}
