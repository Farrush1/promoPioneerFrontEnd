export async function uploadFile(file, pathLocation) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = file.name.toLowerCase().split(" ").join("-");
  const filePath = path.join(pathLocation, Date.now() + "-" + fileName);
  const finalPath = path.join(process.cwd(), "public", filePath);

  await writeFile(finalPath, buffer);

  return filePath.replace("\\", "/");
}
