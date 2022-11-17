import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import gCliente from "../google_client.json";

const Google = () => {
  const clientId = gCliente.web.client_id;
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default Google;
