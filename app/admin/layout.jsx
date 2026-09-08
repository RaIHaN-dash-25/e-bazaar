import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
  title: "E-Bazaar. - Admin",
  description: "E-Bazaar. - Admin",
};

export default function RootAdminLayout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}