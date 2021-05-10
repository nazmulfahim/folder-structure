const Fetch = (query, token) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    fetch(process.env.REACT_APP_serverURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((parseRes) => resolve(parseRes))
      .catch((err) =>
        resolve({ errors: [{ message: "Opps! Something went wrong" }] })
      );
  });
};

export default Fetch;
