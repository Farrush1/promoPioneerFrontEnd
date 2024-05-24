const fetchPayment = async id => {
  try {
    const res = await fetch(`http://localhost:5000/api/payments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data.payment;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { fetchPayment };
