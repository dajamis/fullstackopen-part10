import React from "react"
import { TextInput, Pressable, View, StyleSheet } from "react-native"
import Text from "./Text"
import { useFormik } from "formik"
import * as yup from "yup"
import theme from "../theme"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
})

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username
            ? styles.inputError
            : {},
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        testID="usernameInput"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password
            ? styles.inputError
            : {},
        ]}
        placeholder="Password"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        testID="passwordInput"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        testID="submitButton"
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const response = await signIn({ username, password })
      const accessToken = response?.authenticate?.accessToken
      if (accessToken) {
        console.log("Authentication successful")
        navigate("/")
      } else {
        console.log("No access token found in the received data.")
      }
    } catch (e) {
      console.error("Error during sign-in:", e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.shades0,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: theme.colors.shades0,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default SignIn
