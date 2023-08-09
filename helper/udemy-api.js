const axios = require("axios");

/* It uses the `axios` library to make an HTTP GET request to 
the Udemy API to fetch information about a course. */
module.exports.getCourse = async (courseLink) => {
  try {
    const url = new URL(courseLink);

    const courseName = url.pathname.replace(/^\/course\/(.*?)(\/)?$/, "$1");
    const couponCode = url.search.match(/couponCode=([^&]+)/)?.[1];

    const response = await axios.get(
      `https://www.udemy.com/api-2.0/courses/${courseName}?fields[course]=title,headline,image_480x270,created,locale,url,price`
    );

    return {
      title: response.data.title || "Title - Undefined",
      description: response.data.headline || "Description - Undefined",
      image: response.data.image_480x270 || "Image - Undefined",
      price: response.data.price || "Price - Undefined",
      url: "https://www.udemy.com" + response.data.url || "URL - Undefined",
      coupon_code: couponCode || "Coupon Code - Undefined",
      language: response.data.locale.title || "Language - Undefined",
    };
  } catch (error) {
    throw error;
  }
};
