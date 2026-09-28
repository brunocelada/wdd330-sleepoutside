const checkoutUrl = "https://wdd330.herokuapp.com/checkout";

async function convertToJson(response) {
  const jsonResponse = await response.json();
  if (response.ok) {
    return jsonResponse;
  }
  throw { name: "servicesError", message: jsonResponse };
}

export default class ExternalServices {
  async checkout(order) {
    const response = await fetch(checkoutUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return convertToJson(response);
  }
}
