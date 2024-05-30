export const getWarehouse = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/warehouses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json();
    return data.warehouse;
  } catch (error) {}
};
