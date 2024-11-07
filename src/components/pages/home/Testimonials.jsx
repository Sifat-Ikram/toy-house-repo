import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import testimonial from "../../../assets/wheels/testimonial.png";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [] } = useQuery({
    queryKey: ["review._id"],
    queryFn: async () => {
      const res = await axiosPublic.get("/review");
      return res.data;
    },
  });

  console.log(reviews);

  return (
    <div
      style={{
        backgroundImage: `url(${testimonial})`,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:w-4/5 mx-auto max-sm:gap-5 justify-center items-center pb-10">
        <div className="w-2/5 flex justify-center items-center">
          <h1 className="text-4xl font-coiny">Listen to Our Customers </h1>
        </div>
        <div className="flex-1 flex justify-center items-center gap-5 pt-10">
          {reviews.slice(0, 2).map((review) => (
            <div key={review._id} className="rounded-3xl p-5 bg-white">
              <div className="flex items-center gap-3">
                <img src={review.image} className="h-12 w-12 rounded-full" />
                <h1 className="font-coiny text-xl">{review.username}</h1>
              </div>
              <p className="min-h-10">{review.text}</p>
              <h1>
                <span className="font-bold">Product:</span> {review.productName}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
