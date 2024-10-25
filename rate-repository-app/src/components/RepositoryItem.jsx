import React from "react"
import { Text, View, StyleSheet, Image, Pressable, Linking } from "react-native"
import theme from "../theme"

const formatCount = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k"
  }
  return number.toString()
}

const RepositoryItem = ({ item, showButton }) => {
  const handleOpenInBrowser = () => {
    if (item.url) {
      Linking.openURL(item.url).catch((err) =>
        console.error("Failed to open URL:", err)
      )
    } else {
      console.log("No URL available for this repository.")
    }
  }

  return (
    <View style={styles.itemCard} testID="repositoryItem">
      <View style={styles.itemCardDetails}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.itemCardDetailsInfo}>
          <View style={styles.itemCardDetailsInfoTextBoxDescription}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.fullName}
            </Text>
            <Text>{item.description}</Text>
            <Text style={styles.languageLabel}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemCardStats}>
        <View style={styles.statItem}>
          <Text style={styles.statText}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>{formatCount(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>{formatCount(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>{formatCount(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {showButton && (
        <Pressable
          onPress={handleOpenInBrowser}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  itemCard: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 20,
    backgroundColor: theme.colors.shades0,
  },
  itemCardDetails: {
    flexDirection: "row",
  },
  itemCardDetailsInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 1,
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  languageLabel: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.primary,
    color: "#fff",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  itemCardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statText: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default RepositoryItem
