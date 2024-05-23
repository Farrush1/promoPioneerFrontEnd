const storeCarts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/checkouts/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(),
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchCheckouts = async id => {
  try {
    const res = await fetch(`http://localhost:5000/api/checkouts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data.getCheckCollection;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchCities = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/cities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data.city;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchBio = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/users/bio`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data.users;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { storeCarts, fetchCheckouts, fetchCities, fetchBio };
