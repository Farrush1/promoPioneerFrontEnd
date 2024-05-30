export default async function getCategory() {
  const response = await fetch('http://localhost:4000/api/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data.category;
}
