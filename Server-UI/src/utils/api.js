// axios.interceptors.request.use((config) => {
//   config.headers["app-id"] = "60ccbd06b9a9e7bfe8846ebe";
//   return config;
// });

// export const request = {
//   get: axios.get,
// };

import axios from "axios";
export default axios.create({
   baseURL: "http://localhost:5002",
  //  baseURL: "http://10.216.173.143:5002",
  // baseURL: "http://3.110.222.142:5002",
});
