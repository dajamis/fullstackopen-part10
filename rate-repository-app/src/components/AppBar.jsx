import React from "react"
import { View, StyleSheet, Pressable, ScrollView } from "react-native"
import Constants from "expo-constants"
import { useQuery, useApolloClient } from "@apollo/client"
import { Link, useNavigate } from "react-router-native"
import Text from "./Text"
import theme from "../theme"
import { GET_AUTHORIZED_USER } from "../graphql/queries"
import useAuthStorage from "../hooks/useAuthStorage"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    flexDirection: "row",
  },
  tab: {
    marginRight: 20,
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
})

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER)
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    navigate("/sign-in")
  }

  const user = data?.me

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>

        {user ? (
          <Pressable onPress={handleSignOut} style={styles.tab}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/sign-in" component={Pressable} style={styles.tab}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
