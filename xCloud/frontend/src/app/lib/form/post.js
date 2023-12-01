import axios from "axios";

// global functions to post form with data

/**
 * Adds two numbers together.
 *
 * @param {string} link Post link without backend url.
 * @param {object} formData Data that is to be posted to the url.
 * @param {Function} onSucess Callback function on Sucess.
 * @param {Function} onElse Callback function on Else.
 */
async function formPost(link, formData, onSucess, onElse, onError = null) {
  try {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${link}`, formData)
      .then((res) => {
        if (res.data.status === "SUCESS") {
          onSucess(res.data);
        } else {
          onElse(res.data);
        }
      });
  } catch (error) {
    console.error(error);
    if (onError) onError(error);
  }
}

/**
 * Adds two numbers together.
 *
 * @param {string} link Post link without backend url.
 * @param {object} formData Data that is to be posted to the url.
 * @param {Function} onSucess Callback function on Sucess.
 * @param {Function} onElse Callback function on Else.
 */
async function formSecurePost(
  link,
  formData,
  onSucess,
  onElse,
  onError = null,
) {
  try {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${link}`, formData)
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.status === "SUCESS") {
          onSucess(res.data);
        } else {
          onElse(res.data);
        }
      });
  } catch (error) {
    console.error(error);
    if (onError) onError(error);
  }
}

export { formPost, formSecurePost };
