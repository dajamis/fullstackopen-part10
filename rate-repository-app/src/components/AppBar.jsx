import { View, StyleSheet, Pressable, ScrollView } from "react-native"
import Constants from "expo-constants"
import Text from "./Text"
import theme from "../theme"
import { Link } from "react-router-native"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingTop: 40,
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/sign-in" component={Pressable} style={styles.tab}>
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
