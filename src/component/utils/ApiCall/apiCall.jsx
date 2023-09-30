import axios from "axios";
// import jwt_decode from "jwt-decode";
import { Store } from "../Store/store";

const defaultOptions = {
  baseURL: "https://assignment.8848digitalerp.com",
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  function (config) {
    const token = Store?.getState()?.login?.token;
    // const token=getToken();
    // const id = Store?.getState()?.login.id;
    if (token ) {
      config.headers["Authorization"] = token;
    //   config.headers["id"] = id;
    } else {
      delete config.headers["Authorization"];
    //   delete config.headers["id"];
    }
    return config;
  },
  (error) => {
    console.log("Error", error);
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    // if (error.message === "Network Error" && !error.response) {
    // }
    if (401 === error.response.status || error.message === "Network Error") {
        console.log("401-------------")
        // LogOutTrigger()
      }

    if (error) {
      return Promise.reject(error);
    }
  }
);

// export const getToken = () => {
//   const { token } = Store.getState().login.token;
//   if (token) {
//     try {
//       const JWT = jwt_decode(token);
//       const currentDate = Math.round(new Date().getTime() / 1000);
//       if (JWT && JWT.exp > currentDate) {
//         return token;
//       }
//       return null;
//     } catch (error) {
//       return null;
//     }
//   }
//   return null;
// };

// export const checkToken = (token) => {
// 	try {
// 		const JWT = jwt_decode(token);
// 		const currentDate = Math.round(new Date().getTime() / 1000);
// 		if (JWT && JWT.exp > currentDate) {
// 			return JWT;
// 		}
// 		return null;
// 	} catch (error) {
// 		return null;
// 	}
// };
export default instance;
