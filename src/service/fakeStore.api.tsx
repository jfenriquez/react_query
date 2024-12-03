import axios from "axios";

export const fakeStoreApi = axios.create({
  baseURL: "https://deluxe-pear-keeper.glitch.me",
  /* headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  }, */
});
