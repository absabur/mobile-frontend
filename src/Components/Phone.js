import AddToCompare from "./AddToCompare";

const Phone = ({ phone }) => {
  return (
    <div>
      {phone && (
        <div>
          <h1 style={{ textAlign: "center" }}>Name {phone.name}</h1>
          <p style={{ textAlign: "center", fontSize: "22px" }}>
            Brand: {phone.brand.value}
          </p>
          <div className="specs-top">
            <div className="phone-prices">
              {phone.price.map((price) => {
                return (
                  <div className="phone-price" key={price._id}>
                    <p>Varient: {price?.varient}</p>
                    <p>
                      Price:{" "}
                      <span style={{ color: "blue" }}>{price?.price}</span> BDT
                      ({price?.status})
                    </p>
                  </div>
                );
              })}
              <AddToCompare slug={phone.slug} />
            </div>
            {phone.images.map((image) => (
              <img
                key={image._id}
                src={`${image.url}`}
                alt={phone.name}
                style={{ height: "300px", width: "auto" }}
              />
            ))}
          </div>
          {phone.specifications?.map((specification) => (
            <div
              style={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: "rgba(200,200,200,0.3)",
                boxShadow: "0 0 5px #0000005f",
                borderRadius: "10px",
              }}
              key={specification._id}
            >
              <h2
                style={{
                  width: "100%",
                  backgroundColor: "tomato",
                  color: "white",
                  padding: "2px",
                  fontSize: "22px",
                  textAlign: "center",
                }}
                className={`searchable`}
              >
                {specification.categoryValue}
              </h2>
              <div>
                {specification.specs?.map((spec) => (
                  <div className="specs" key={spec?._id}>
                    <h3 className={`searchable spec`} style={{ flex: 1 }}>
                      {spec?.specKey}
                    </h3>

                    <div
                      style={{
                        flex: 3,
                        height: "100%",
                        overflow: "auto",
                        paddingLeft: "10px",
                      }}
                    >
                      {spec.specKeyId === "670d0e2b7343984e7bf2f8cd" && (
                        <>{phone.brand.value}</>
                      )}
                      {spec.value && (
                        <p className={`searchable spec-value`}>{spec.value}</p>
                      )}
                      {!spec.value &&
                        spec?.filterValues?.map((value) => (
                          <p
                            key={value.filterId}
                            className={`searchable spec-value`}
                          >
                            {value.filterValue}
                          </p>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Phone;
