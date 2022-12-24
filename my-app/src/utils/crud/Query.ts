import { gql } from "@apollo/client";

export const getCheckout = gql`
query Checkout($donationAmount: Float) {
  checkout(donationAmount: $donationAmount) {
    session
  }
}
`;