import { gql } from "@apollo/client";

export const getJobs = gql`
  query getJobs {
    jobs {
      id
      title
      isFeatured
      locationNames
      company {
        id
        name
        logoUrl
      }
      cities {
        id
        name
        country {
          isoCode
          name
        }
      }
      remotes {
        type
      }
    }
  }
`;
