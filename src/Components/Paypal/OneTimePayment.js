import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { decodeToken } from "../../dashboard/auth/Auth";
import { useMutation } from "@apollo/react-hooks";
import swal from "sweetalert";
import gql from "graphql-tag";

const UPDATE_USER_TIER = gql`
  mutation editAUser($newEditUser: newEditUserInput!) {
    editUser(input: $newEditUser) {
      ... on DatabankUser {
        id
        email
        tier
        organization_type
        token
      }
      ... on Error {
        message
      }
    }
  }
`;

export default function OneTimePayment() {
  const [userUpdated, { loading, error }] = useMutation(UPDATE_USER_TIER);
  const history = useHistory();

  useEffect(function renderPaypalButtons() {
    window.paypal
      .Buttons({
        env: "sandbox",
        style: {
          shape: "pill",
          size: "responsive",
          color: "blue",
          label: "paypal"
        },

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "100"
                }
              }
            ]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(async function(details) {
            let givenName = details.payer.name.given_name;
            swal({
              title: "",
              text: `${givenName}, your account has been upgraded to premium!`,
              icon: "success"
            });

            const token = localStorage.getItem("token");
            const decoded = decodeToken(token);
            decoded.subscription_id = data.subscriptionID;
            localStorage.setItem("xyz", decoded.subscription_id);
            console.log("decoded", decoded);
            decoded.tier = "PAID";
            delete decoded.iat;
            delete decoded.exp;
            const editedUser = await userUpdated({
              variables: { newEditUser: decoded }
            });
            history.push("/data");
            console.log("editeduser", editedUser);
          });
        },
        onError: function(err) {
          console.error("err", err);
        }
      })
      .render("#paypal-button-container");
  }, []);
  return (
    <div
      id="paypal-button-container"
      style={{
        display: "inline-block",
        padding: "1rem 3rem",
        margin: "0 auto"
      }}
    ></div>
  );
}
