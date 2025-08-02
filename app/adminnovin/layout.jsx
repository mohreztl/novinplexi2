import Sidebar from "@/components/adminnovin/Sidebar";
import isAdmin from "@/utils/isAdmin";
import "@/app/globals.css";

function AdminLayout({ children }) {
  return (
    <body className="bg-gray-50" suppressHydrationWarning>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 lg:mr-64 transition-all duration-300">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </body>
  );
}

export default isAdmin(AdminLayout);
