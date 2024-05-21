const storeCarts = () => {
  const checkout = async () => {
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  checkout();
};

module.exports = storeCarts;
