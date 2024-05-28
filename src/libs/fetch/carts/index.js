const fetchCarts = async (setIsLoading) => {
  try {
    const res = await fetch('http://localhost:5000/api/carts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json();
    return data.carts.cartItem;
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

const updateCartItem = async (itemId, newQuantity) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/carts/cart-items/${itemId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: newQuantity }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteCartItem = async (itemId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/carts/cart-items/${itemId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { fetchCarts, updateCartItem, deleteCartItem };
