import axios from "axios";

export async function getData(url, setter, req = {}) {
  try {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, req)
      .then((res) => {
        // console.log(res.data);
        setter(res.data);
      });
  } catch (err) {
    console.error("Fetching Error");
  }
}

export async function getSecureData(url, setter, accessToken, req = {}) {
  try {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        req,
      })
      .then((res) => {
        // console.log(res.data.data);
        setter(res.data.data);
      });
  } catch (err) {
    console.error("Fetching Error");
  }
}
