import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      <p>This is the default Home Page for your React application.</p>
      <div>
        <Link href="/user/admin/headings">Go to specs Heading</Link>
        <br />
        <Link href="/user/admin/specification">Go to specification</Link>
        <br />
        <Link href="/user/admin/filter">Go to filter</Link>
        <br />
        <Link href="/user/admin/brand">Go to Brand</Link>
        <br />
        <Link href="/user/admin/add-phone">Add phone</Link>
        <br />
        <Link href="/user/admin/phones">Phones</Link>
      </div>
    </div>
  );
}
