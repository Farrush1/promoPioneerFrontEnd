import ProfileSidebar from "@/components/ProfileSidebar";

export default function ProfileLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div className="xl:max-w-6xl min-h-screen mx-auto px-4 pt-24 xl:px-0 flex flex-col md:flex-row gap-6 mb-8">
      {/* Include shared UI here e.g. a header or sidebar */}
      <ProfileSidebar />

      {children}
    </div>
  );
}
