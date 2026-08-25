import { isAdmin } from "@/lib/admin-auth";
import AdminEditor from "./admin-editor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  return <AdminEditor initiallyAuthenticated={await isAdmin()} />;
}
