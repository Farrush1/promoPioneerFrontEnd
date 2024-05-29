import Image from "next/image";

export default function Unauthorized() {
  return (
    <main className="h-screen xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0 text-center space-y-16">
      <h1 className="text-3xl font-bold text-slate-800">Unauthorized</h1>
      <Image
        src={"unauthorized-vector.svg"}
        width={500}
        height={500}
        alt="Unauthorized"
        className="mx-auto"
      />
      <p>
        You are not authorized as an admin to access the dashboard, please log
        in with the admin email if that is you
      </p>
    </main>
  );
}
