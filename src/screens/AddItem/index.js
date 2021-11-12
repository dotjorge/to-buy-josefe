import React, { useContext, useState, useRef, useEffect } from "react"
import { Input, VStack, Icon, Box, FormControl, Button, Slider, Text } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import { Items } from "../../context/Items"
import SafeAreaView from "../../components/SafeAreaView"
import { useIsFocused } from "@react-navigation/native"

export default function AddItem({ navigation }) {
  const [thingToBuy, setThingToBuy] = useState({ title: "", description: "", qtd: 1 })
  const [inputIsValid, setInputIsValid] = useState({ title: true, description: true })
  const { addItem } = useContext(Items)

  // Input refs
  const title = useRef()
  const description = useRef()

  // When screen is loaded/selected
  const screenIsLoaded = useIsFocused()
  useEffect(() => {
    if (screenIsLoaded) {
      title.current.focus()
    }
  }, [screenIsLoaded])

  const getRef = { title, description }

  function refFocus(ref) {
    if (!ref) return
    setTimeout(() => getRef[ref].current.focus(), 1000)
  }

  function handleAdd() {
    const firstError = Object.keys(thingToBuy).find(key => thingToBuy[key] === "")
    refFocus(firstError)
    setInputIsValid(thingToBuy)
    if (firstError) return

    addItem(thingToBuy)
    setThingToBuy({ title: "", description: "", qtd: 1 })
  }

  return (
    <SafeAreaView>
      <Box alignItems="stretch" p="8" marginX={"auto"} maxW={"xl"} width={"full"}>
        <VStack alignItems="stretch" space="5">
          <FormControl>
            <FormControl.Label mb="3">Add something to buy</FormControl.Label>
            <Input
              ref={title}
              placeholder="Title"
              ariaLabel={"Task title"}
              isInvalid={!inputIsValid.title}
              value={thingToBuy.title}
              onChangeText={text => setThingToBuy({ ...thingToBuy, title: text })}
              onSubmitEditing={() => {
                description.current.focus()
              }}
            />
          </FormControl>
          <FormControl>
            <Input
              ref={description}
              placeholder="Description"
              ariaLabel={"Task description"}
              isInvalid={!inputIsValid.description}
              value={thingToBuy.description}
              onChangeText={text => setThingToBuy({ ...thingToBuy, description: text })}
              onSubmitEditing={handleAdd}
            />
          </FormControl>
          <FormControl>
            <Slider
              accessibilityLabel="Quantity"
              colorScheme={"green"}
              size={"md"}
              defaultValue={1}
              maxValue={10}
              value={thingToBuy.qtd}
              minValue={1}
              onChange={value => {
                setThingToBuy({ ...thingToBuy, qtd: value })
              }}
              step={1}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text textAlign="center">Quantity: {thingToBuy.qtd}</Text>
          </FormControl>
        </VStack>
        <Button
          colorScheme="green"
          ariaLabel={"Add task"}
          mt="5"
          rightIcon={<Icon as={Ionicons} name="add" size="sm" />}
          onPress={handleAdd}>
          {" "}
        </Button>
      </Box>
    </SafeAreaView>
  )
}
