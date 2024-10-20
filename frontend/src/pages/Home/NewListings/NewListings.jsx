import { useEffect, useState } from "react";
import { fetchListings } from "../../../api/api";
import { ListingCard, Loading } from "../../../components/Components";

function NewListings() {
  const [newListings, setNewListings] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const listings = await fetchListings({ limit: 6 });
        setNewListings(listings);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchData();
  }, []);

  if (status === "loading") return <Loading />;
  if (status === "failed")
    return <p className="text-rose-500 text-center">Error: {error}</p>;

  return (
    <section className="py-10 px-6 mx-auto max-w-8xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-white mb-2">
          Discover Your Next Adventure
        </h2>
        <p className="text-lg text-gray-400">
          Fresh destinations just for you!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {newListings.length > 0 ? (
          newListings.map(
            ({
              _id,
              title,
              listingImage,
              country,
              location,
              availability,
              pricePerNight,
            }) => (
              <ListingCard
                key={_id}
                title={title}
                country={country}
                location={location}
                imageURL={listingImage}
                availability={availability}
                price={pricePerNight}
                detailsLink={`/listings/${_id}`}
                className="transition-transform transform hover:scale-105 duration-200"
              />
            )
          )
        ) : (
          <p className="text-center col-span-full text-gray-400">
            No listings available. Please check back later!
          </p>
        )}
      </div>
    </section>
  );
}

export default NewListings;
