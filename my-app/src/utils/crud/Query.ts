import { gql } from "@apollo/client";

export const getCheckout = gql`
query Checkout($donationAmount: Int) {
  checkout(donationAmount: $donationAmount) {
    session
  }
}
`;