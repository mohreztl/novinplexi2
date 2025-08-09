import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function isAdmin(PageComponent) {
  return async function AdminPage(context) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.admin) {
      redirect("/login");
    }

    return <PageComponent {...context} />;
  };
}