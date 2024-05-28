import DashboardMenu from "@/components/DashboardMenu";

export const metadata = {
  title: "Dashboard Admin - Promo Pioneer",
  description: "Dashboard for admin promo pioneer",
};

export default function DashboardLayout({ children }) {
  return (
    <main className="w-full">
      <div className="flex flex-col md:flex-row p-4 gap-8">
        <DashboardMenu />
        <div className="p-4 bg-gray-100 rounded-lg w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
