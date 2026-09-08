import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "E-Bazaar. - Store Dashboard",
    description: "E-Bazaar. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
