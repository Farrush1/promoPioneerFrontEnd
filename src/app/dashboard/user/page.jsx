"use client"
import UserTable from "@/components/UserTable";

export default function User() {
  return (
    <main className="xl:max-w-6xl mx-auto xl:px-0 overflow-y-auto">
        <h1 className="font-semibold text-2xl mb-10">User Page</h1>
        <UserTable />
    </main>
  );
}