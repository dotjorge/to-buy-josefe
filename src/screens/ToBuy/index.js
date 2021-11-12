import React, { useContext, useEffect } from "react"
import {
  Icon,
  IconButton,
  Button,
  Text,
  Box,
  VStack,
  HStack,
  Center,
  Spacer,
  FlatList,
  useColorModeValue,
  useTheme,
} from "native-base"
import { Ionicons } from "@expo/vector-icons"
import { Items } from "../../context/Items"
import { useIsFocused } from "@react-navigation/native"
import SafeAreaView from "../../components/SafeAreaView"

export default function ToBuy({ navigation }) {
  const { colors } = useTheme()
  const taskBgColor = useColorModeValue(colors.green[400], colors.green[900])
  const { items, toBuy, handleDelete, handleStatusChange, resetItemsAddedBadge } = useContext(Items)

  // When screen is loaded/selected
  const screenIsLoaded = useIsFocused()
  useEffect(() => {
    if (screenIsLoaded) {
      resetItemsAddedBadge()
    }
  }, [screenIsLoaded])

  return (
    <SafeAreaView>
      <Center style={{ padding: 20 }} flex={1}>
        <FlatList
          style={{ width: "100%", borderRadius: 20 }}
          extraData={items}
          data={toBuy}
          ListHeaderComponent={() => (
            <>
              {toBuy.length < 1 && (
                <Box
                  flex={1}
                  alignItems="stretch"
                  p="8"
                  marginX={"auto"}
                  maxW={"xl"}
                  width={"full"}>
                  <Text mx="2">There's nothing to buy</Text>
                  <Button
                    mt="5"
                    colorScheme={"green"}
                    ariaLabel={"Add something"}
                    rightIcon={<Icon as={Ionicons} name="arrow-forward" size="xs" />}
                    onPress={() => {
                      navigation.navigate("Add task")
                    }}>
                    Add something
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
              style={[
                {
                  backgroundColor: taskBgColor,
                  padding: 20,
                },
                index === 0 && {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
                index === toBuy.length - 1 && {
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
                index.length === 1 && {
                  borderRadius: 20,
                },
              ]}
              justifyContent="space-between"
              alignItems="center">
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="green.100"
                bold>
                x{item.qtd}
              </Text>
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="green.100"
                  bold>
                  {item.title}
                </Text>
                <Text
                  color="green.100"
                  _dark={{
                    color: "warmGray.200",
                  }}>
                  {item.description}
                </Text>
              </VStack>
              <Spacer />
              <IconButton
                size="sm"
                icon={
                  <Button
                    rightIcon={
                      <Icon ariaLabel={"Send to the cart"} as={Ionicons} name="add" size="xs" />
                    }
                    colorScheme="green"
                    variant="subtle"
                    onPress={() => handleStatusChange(item.id, "cart")}>
                    Cart
                  </Button>
                }
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
