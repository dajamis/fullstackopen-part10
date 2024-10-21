import React from "react"
import { Pressable, StyleSheet } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
  tab: {
    marginRight: 20,
  },
})

const AppBarTab = ({ title }) => {
  return (
    <Pressable style={styles.tab}>
      <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
        {title}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
