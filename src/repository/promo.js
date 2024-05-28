const editPromo = async (id, objPayload) => {
  try {
    const response = await fetch(`http://localhost:5000/api/promo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objPayload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was an error creating the promo!', error);
  }
};

const createPromo = async (objPayload) => {
  try {
    const response = await fetch('http://localhost:5000/api/promo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objPayload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was an error creating the promo!', error);
  }
};

module.exports = {
  createPromo,
  editPromo,
};
