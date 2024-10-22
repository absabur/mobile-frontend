import SearchAdmin from "@/Components/SearchAdmin";

export const metadata = {
  title: "MobileSpecs | Admin",
  description: "MobileSpecs | Admin",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <SearchAdmin />
      {children}
    </div>
  );
}
