import Link from "next/link";
import AddToCompare from "./AddToCompare";

const Phones = async () => {
  const response = await fetch("http://localhost:8000/api/phone", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies
    cache: "no-store",
  });
  const res = await response.json();
  let phones = res.phones;

  return (
    <div style={{ display: "flex" }}>
      {phones?.map((phone) => {
        return (
          <div
            key={phone._id}
            style={{
              width: "200px",
              border: "1px solid black",
              marginRight: "10px",
            }}
          >
            <img
              src={`${phone.images[0].url}`}
              alt={phone.name}
              style={{ height: "100px", width: "auto" }}
            />
            <AddToCompare slug={phone.slug} />
            <Link href={`/${phone.slug}`}>
              <h2>{phone.name}</h2>
              <p>
                {phone.price[0].price} BDT ({phone.price[0].varient})
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Phones;
