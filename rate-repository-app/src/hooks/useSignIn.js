import { useMutation, useApolloClient } from "@apollo/client"
import { AUTHENTICATE } from "../graphql/mutations"
import useAuthStorage from "../hooks/useAuthStorage"

const useSignIn = () => {
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(AUTHENTICATE)
  const authStorage = useAuthStorage()

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username, password },
        },
      })

      if (data?.authenticate?.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken)
        console.log("Access token stored successfully")

        await apolloClient.resetStore()
      }

      return data
    } catch (error) {
      console.error("Authentication failed:", error)
      throw error
    }
  }

  return [signIn, result]
}

export default useSignIn
