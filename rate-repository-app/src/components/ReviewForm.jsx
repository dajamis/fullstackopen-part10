import React from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-native"
import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"
import theme from "../theme"

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner name is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating cannot be more than 100"),
  review: Yup.string(),
})

const CreateReviewForm = () => {
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW)

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      review: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await createReview({
          variables: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating),
            text: values.review,
          },
        })
        if (data?.createReview) {
          navigate(`/${data.createReview.repositoryId}`)
        }
      } catch (error) {
        console.error("Error creating review:", error)
      }
    },
  })

  return (
    <View style={styles.form}>
      <TextInput
        style={[
          styles.input,
          formik.touched.ownerName && formik.errors.ownerName
            ? styles.inputError
            : {},
        ]}
        placeholder="Repository owner name"
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        value={formik.values.ownerName}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName
            ? styles.inputError
            : {},
        ]}
        placeholder="Repository name"
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        value={formik.values.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating
            ? styles.inputError
            : {},
        ]}
        placeholder="Rating between 0 and 100"
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        value={formik.values.rating}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Review"
        onChangeText={formik.handleChange("review")}
        onBlur={formik.handleBlur("review")}
        value={formik.values.review}
        multiline
      />

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.submitButtonText}>Create a review</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
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

export default CreateReviewForm
