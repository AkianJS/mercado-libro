import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import gCliente from "../google_client.json";

const Google = ({handleGoogleSuccess, handleGoogleError}) => {
  const clientId = gCliente.web.client_id;
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          
        }}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default Google;
