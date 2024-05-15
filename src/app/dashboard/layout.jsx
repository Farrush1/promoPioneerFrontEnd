import DashboardMenu from "@/components/DashboardMenu";

export default function DashboardLayout({ children }) {
  return (
    <main className="w-full h-[999px]">
      <div className="flex flex-col md:flex-row p-4 gap-8 h-screen">
        <DashboardMenu />
        <div className="p-4 bg-gray-100 rounded-lg w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
