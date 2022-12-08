import { ENDPOINT } from "../config";

const fetchSetter = async (query) => {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });
    const result = await res.json()
    return result

  } catch (errors) {
    return errors
  }
};

export default fetchSetter;
