import React, { createContext, useState } from "react"

export const Items = createContext()

export default function ItemsProvider({ children }) {
  const [items, setItems] = useState([])
  const [itemsAddedBadge, setItemsAddedBadge] = useState(0)
  const [tasksDoneBadge, setTasksDoneBadge] = useState(0)

  const resetItemsAddedBadge = () => setItemsAddedBadge(0)
  const resetCartItemsBadge = () => setTasksDoneBadge(0)

  const addItem = ({ title, description, qtd }) => {
    if (!title || !description) return
    const taskToAdd = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
      title: title,
      description: description,
      qtd: qtd,
      isOnCart: false,
    }

    setItemsAddedBadge(prevState => prevState + 1)

    if (!items) return setItems([{ ...taskToAdd }])

    setItems([...items, { ...taskToAdd }])
  }

  const handleDelete = targetId => {
    const temp = items.filter(item => item.id !== targetId)
    if (items.length === 1) return setItems([])

    setItems(temp)
  }

  const handleStatusChange = (targetId, type) => {
    const temp = items.map(item => {
      if (item.id === targetId) {
        return {
          ...item,
          isOnCart: !item.isOnCart,
        }
      }
      return item
    })

    setItems(temp)

    if (type === "cart") return setTasksDoneBadge(prevState => prevState + 1)

    return setItemsAddedBadge(prevState => prevState + 1)
  }

  const toBuy = items?.filter(item => item.isOnCart !== true)
  const cartItems = items?.filter(item => item.isOnCart === true)

  return (
    <Items.Provider
      value={{
        items,
        toBuy,
        cartItems,
        addItem,
        handleDelete,
        handleStatusChange,
        itemsAddedBadge,
        tasksDoneBadge,
        resetItemsAddedBadge,
        resetCartItemsBadge,
      }}>
      {children}
    </Items.Provider>
  )
}
