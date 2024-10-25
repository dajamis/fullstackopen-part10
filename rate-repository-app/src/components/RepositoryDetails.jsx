import React from "react"
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository"
import theme from "../theme"

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem item={repository} showButton={true} />
  </View>
)

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer1}>
    <View style={styles.ratingContainer}>
      <Text style={styles.RatingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContainer2}>
      <Text style={styles.reviewAuthor}>{review.user.username}</Text>
      <Text style={styles.reviewDate}>
        {new Date(review.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
)

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryDetails = () => {
  const { id } = useParams()
  const { repository, loading, error, fetchMore } = useRepository({
    id,
    first: 3,
  })

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (error) {
    return (
      <View>
        <Text>Error fetching repository details: {error.message}</Text>
      </View>
    )
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </View>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.3}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  reviewContainer1: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  reviewContainer2: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    flex: 1,
  },
  reviewAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewDate: {
    color: "gray",
    marginBottom: 5,
  },
  reviewText: {
    marginTop: 5,
  },
  ratingContainer: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  RatingText: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
})

export default RepositoryDetails
