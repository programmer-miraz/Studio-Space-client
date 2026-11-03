import { authClient } from "../auth-client";

const client_getToken = async () => {
    const { data: tokeData } = await authClient.token()
    const token = tokeData?.token
    console.log(token);
    return token

};
export default client_getToken;