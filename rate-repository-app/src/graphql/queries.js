import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          description
          fullName
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          language
          ownerAvatarUrl
        }
      }
    }
  }
`
export const GET_AUTHORIZED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`
