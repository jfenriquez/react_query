import axios from "axios";

export const apiGithub = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});
