// /app/shop/layout.tsx
import SidebarProduct from "@/components/products/SidebarProduct"

export default function ShopLayout({ children }) {
  return (
    <div className="flex gap-1 mx-0 mt-6">
     
        <SidebarProduct />
  
      <main className="w-full">{children}</main>
    </div>
  );
}
