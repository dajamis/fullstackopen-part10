import { StyleSheet, View } from "react-native"

import { Route, Routes, Navigate } from "react-router-native"

import RepositoryList from "./RepositoryList"
import AppBar from "./AppBar"
import theme from "../theme"
import SignIn from "./SignIn"
import RepositoryDetails from "./RepositoryDetails"
import ReviewForm from "./ReviewForm"
import SignUpForm from "./SignUpForm"
import MyReviews from "./MyReviews"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral50,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/review-form" element={<ReviewForm />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/:id" element={<RepositoryDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
