import axios from "axios";
import Cookies from "js-cookie"

const url = {
  localHost: "http://localhost:3011/api",
  vercel: "https://mern-project-1-gamma.vercel.app/api"
}

const apiServer = axios.create({
  baseURL: url.vercel,
  headers :{
    Authorization: `Barear ${Cookies.get("tokenAuth1")}`
  }
});

export { apiServer };
