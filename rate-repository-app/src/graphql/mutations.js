import { gql } from "@apollo/client"

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

// export const CREATE_REPOSITORY = gql`
//   mutation CreateRepository(
//     $name: String!
//     $description: String
//     $visibility: Boolean
//   ) {
//     createRepository(
//       name: $name
//       description: $description
//       visibility: $visibility
//     ) {
//       id
//       fullName
//       description
//       ownerName
//       visibility
//     }
//   }
// `
