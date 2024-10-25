import React, { useState } from "react"
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native"
import { useQuery, useMutation } from "@apollo/client"
import { GET_AUTHORIZED_USER } from "../graphql/queries"
import { DELETE_REVIEW } from "../graphql/mutations"
import { useNavigate } from "react-router-native"
import theme from "../theme"

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review, onViewPress, onDeletePress }) => (
  <View style={styles.reviewContainer1}>
    <View style={styles.ratingContainer}>
      <Text style={styles.RatingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContainer2}>
      <Text style={styles.reviewName}>{review.repository.fullName}</Text>
      <Text style={styles.reviewDate}>
        {new Date(review.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.reviewText}>{review.text}</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={onViewPress}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={onDeletePress}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  </View>
)

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  })
  const navigate = useNavigate()
  const [deleteReview] = useMutation(DELETE_REVIEW)

  const handleDelete = (reviewId) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } })
              refetch()
            } catch (error) {
              console.error("Error deleting review:", error)
            }
          },
        },
      ]
    )
  }

  if (loading) {
    return <ActivityIndicator size="large" />
  }

  if (error) {
    return (
      <View>
        <Text>Error fetching reviews: {error.message}</Text>
      </View>
    )
  }

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || []

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewPress={() => navigate(`/${item.repository.id}`)}
          onDeletePress={() => handleDelete(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
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
  reviewName: {
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
    marginRight: 5,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default MyReviews
