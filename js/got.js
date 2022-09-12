function success(response) {
  console.log(response);
}

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    success(result);
  } catch (error) {
    console.error(error);
  }
}
request('./json/got.json');
