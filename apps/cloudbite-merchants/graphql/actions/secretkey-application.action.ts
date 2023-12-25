'use client'
import { gql, DocumentNode } from "@apollo/client";

const SECRETkey_APPLICATION:DocumentNode = gql`
mutation SecretkeyApplication(
    $email: String!
    $restaurant_license: String!
    $mobile_number: String!
    $passport_nid: String!
) {
    secretkeyApplication(
        input: {
            email: $email
            restaurant_license: $restaurant_license
            mobile_number: $mobile_number
            passport_nid: $passport_nid
        }
    ) {
        id
    }
}
`;
export default SECRETkey_APPLICATION;