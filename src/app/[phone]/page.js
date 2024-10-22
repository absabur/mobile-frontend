import Phone from "@/Components/Phone";

const page = async ({ params }) => {
  const response = await fetch(
    `http://localhost:8000/api/phone/${params.phone}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      cache: "no-store",
    }
  );
  const res = await response.json();
  let phone = res.phone;

  return (
    <div>
      <Phone phone={phone} />
    </div>
  );
};

export default page;
