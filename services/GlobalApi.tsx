import axios from "axios";

export const GetAuthUserData=async(token:string)=>{
    
    const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer' + token } },
      );
      return userInfo.data;
}