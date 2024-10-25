import React from "react"
import { View, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"

const RepositorySorter = ({ selectedSort, setSelectedSort }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSort}
        onValueChange={(value) => setSelectedSort(value)}
        style={styles.picker}
        dropdownIconColor="gray"
      >
        <Picker.Item label="Select an item..." value="" enabled={false} />
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
})

export default RepositorySorter
