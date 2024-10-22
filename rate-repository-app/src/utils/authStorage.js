import AsyncStorage from "@react-native-async-storage/async-storage"

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:token`)
      return token ? JSON.parse(token) : null
    } catch (e) {
      console.error("Failed to fetch the access token:", e)
      return null
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:token`,
        JSON.stringify(accessToken)
      )
    } catch (e) {
      console.error("Failed to save the access token:", e)
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:token`)
    } catch (e) {
      console.error("Failed to remove the access token:", e)
    }
  }
}

export default AuthStorage
