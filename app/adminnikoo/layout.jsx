import Sidebar from "./components/Sidebar";
import isAdmin from "../../utils/isAdmin";
import "@/app/globals.css";



function AdminLayout({ children }) {
  return (
    <body
    
      suppressContentEditableWarning
      suppressHydrationWarning
    >
      <main   className="bg-[#FFFFFF] flex flex-row ">
        <Sidebar />
 <div className="w-full p-0">
    {children}
    
    </div>
    </main>
    </body>
  );
}
export default isAdmin(AdminLayout);
