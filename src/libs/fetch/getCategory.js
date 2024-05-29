export default async function getCategory() {
  const response = await fetch('http://localhost:5000/api/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data.category;
}
