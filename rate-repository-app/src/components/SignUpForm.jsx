import React from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../graphql/mutations"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"
import theme from "../theme"

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username cannot exceed 30 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password cannot exceed 50 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
})

const SignUpForm = () => {
  const navigate = useNavigate()
  const [signIn] = useSignIn()
  const [createUser] = useMutation(CREATE_USER)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values

      try {
        await createUser({ variables: { user: { username, password } } })

        await signIn({ username, password })

        navigate("/")
      } catch (error) {
        console.error("Error during sign up:", error)
      }
    },
  })

  return (
    <View style={styles.form}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username
            ? styles.inputError
            : {},
        ]}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        value={formik.values.username}
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
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
            ? styles.inputError
            : {},
        ]}
        placeholder="Password confirmation"
        secureTextEntry
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        value={formik.values.passwordConfirmation}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.errorText}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.submitButtonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    alignItems: "center",
    borderRadius: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default SignUpForm
