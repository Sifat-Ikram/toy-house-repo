import { useQuery } from "@tanstack/react-query";

const useDemoProducts = () => {
  // Static product array
  const products = [
    {
      _id: "1a2b3c4d5e6f7g8h9i0j",
      name: "Toy House Panlos 572 Pcs Military Armored Car 12 in 1 City Building Block",
      brand: "Toy House",
      price: 1581,
      currency: "৳",
      color_family: "Black",
      rating: 10,
      questions_answered: 2,
      category: "Toys",
      details:
        "Combine all 12 models into a thrilling military rescue adventure. Includes detailed instructions for 25 play styles and realistic accessories for kids to create their own stories.",
      features: {
        pieces: 572,
        models: {
          total: 12,
          play_styles: 25,
        },
        dimensions: {
          box_size: {
            length: 38,
            width: 26,
            height: 6,
            unit: "cm",
          },
          main_car_size: {
            length: 15.5,
            width: 7,
            height: 9.4,
            unit: "cm",
          },
        },
        age_recommendation: "6+ years",
        extras: [
          "Full-color instructional manual",
          "Stickers",
          "Toy weapon parts",
        ],
        compatibility: "Compatible with most major brands of building blocks",
        theme:
          "Military rescue adventure with trucks, fire helicopters, and more",
      },
      images: [
        "https://i.ibb.co.com/r7cRFR6/img2.png",
        "https://i.ibb.co.com/44X6144/1-1.webp",
        "https://i.ibb.co.com/CMGLDNR/1-2.webp",
        "https://i.ibb.co.com/qsTWbkK/1-3.webp",
        "https://i.ibb.co.com/qsTWbkK/1-3.webp",
      ],
      review: {
        reviewer: "John Doe",
        rating: 4.5,
        review_text:
          "Great toy with a lot of fun play styles. My son loves it!",
        date: "2024-12-11",
      },
    },
    {
      _id: "4d5e6f7g8h9i0j1a2b3c",
      name: "Baby Stroller C3 Pram for Your Baby with Rocking Mood and Adjustable Handle Bar",
      brand: "Toy House",
      price: 8632,
      currency: "৳",
      color_family: "Black/Red",
      rating: 11,
      questions_answered: 69,
      category: "Ride-on",
      details:
        "Premium quality baby stroller with rocking mode, adjustable handle bar, mosquito net, and 3-step backrest.",
      features: {
        load_bearing: "25kg",
        weight: "9kg",
        frame_material: "Steel",
        applicable_age: "Newborn - 5 years old",
        dimensions: {
          length: 64,
          width: 56,
          height: 102,
          unit: "cm",
        },
        extras: [
          "Two-way flexible pushers",
          "Converts into rocking mode",
          "Mosquito net included",
        ],
      },
      images: [
        "https://i.ibb.co.com/02n85gB/6-5.webp",
        "https://i.ibb.co.com/ThwJhHz/img6.png",
        "https://i.ibb.co.com/DfFryDV/6-2.webp",
        "https://i.ibb.co.com/QvdsZD3/6-3.webp",
        "https://i.ibb.co.com/9909gpg/6-4.webp",
      ],
      review: {
        reviewer: "Jane Smith",
        rating: 5,
        review_text: "Excellent stroller, easy to use and very sturdy!",
        date: "2024-12-10",
      },
    },
    {
      _id: "2b3c4d5e6f7g8h9i0j1a",
      name: "FUNSKOOL Quilling Jewellery Art and Craft Toy",
      brand: "Toy House",
      price: 1795,
      currency: "৳",
      color_family: "Multicolor",
      rating: "No Ratings",
      questions_answered: 1,
      category: "Drones",
      details:
        "Funskool's Quilling jewelry kit offers colored paper strips, a specially designed quilling tool, and add-on accessories to create paper jewelry.",
      features: {
        jewelry_sets: 10,
        materials: "Paper",
        item_dimensions: {
          length: 14,
          width: 34,
          height: 4,
          unit: "cm",
        },
        age_recommendation: "Kids",
        extras: ["Easy setup", "Compact design", "Stylish color combination"],
      },
      images: [
        "https://i.ibb.co.com/2KTbX6J/img3.png",
        "https://i.ibb.co.com/QQR098S/4-2.webp",
        "https://i.ibb.co.com/h92HSrV/4-3.webp",
        "https://i.ibb.co.com/Jm5GLky/img4.png",
        "https://i.ibb.co.com/h92HSrV/4-3.webp",
      ],
      review: {
        reviewer: "Mary Johnson",
        rating: 3,
        review_text: "Fun, but the instructions could be more clear.",
        date: "2024-12-09",
      },
    },
    {
      _id: "5e6f7g8h9i0j1a2b3c4d",
      name: "Intex 57180 Rectangular Swimming Pool, White Blue, 203 x 152 x 48 cm, 540 Liters",
      brand: "Intex",
      price: 3600,
      currency: "৳",
      color_family: "White/Blue",
      rating: "No Ratings",
      questions_answered: 0,
      category: "Mother and Baby",
      details:
        "The Intex 57180 Rectangular Swimming Pool offers a fun and safe way to enjoy water activities at home. With its durable vinyl construction and compact design, it’s perfect for kids and adults. The 540-liter capacity ensures hours of entertainment during summer. Easy to set up and maintain, this pool features a stylish white and blue color combination that enhances any backyard. Ideal for cooling off or hosting water games, it’s a must-have for family fun.",
      features: {
        capacity: "540 Liters",
        dimensions: {
          length: 203,
          width: 152,
          height: 48,
          unit: "cm",
        },
        material: "Durable Vinyl",
        age_recommendation: "3+ years",
        extras: ["Easy setup", "Compact design", "Stylish color combination"],
      },
      images: [
        "https://i.ibb.co.com/JQCS5zk/2-3.webp",
        "https://i.ibb.co.com/rk6xd3b/img1.png",
        "https://i.ibb.co.com/JQCS5zk/2-3.webp",
        "https://i.ibb.co.com/MSrp9TG/2-2.webp",
        "https://i.ibb.co.com/JQCS5zk/2-3.webp",
      ],
      review: {
        reviewer: "David Brown",
        rating: 4,
        review_text: "Great pool for the summer. My kids love it!",
        date: "2024-12-08",
      },
    },
    {
      _id: "3c4d5e6f7g8h9i0j1a2b",
      name: "Farlin Heat Resistant α-33 Glass Feeding Bottle 240ml",
      brand: "Farlin",
      price: 1100,
      currency: "৳",
      color_family: "Transparent",
      rating: 2,
      questions_answered: 0,
      category: "Baby Cosmetics",
      details:
        "Imported from Taiwan, high temperature shock resistance, neutral to reduce milk smell.",
      features: {
        nipple_type: "T-3",
        capacity: "240ml",
      },
      material: "BoroSilicate Glass",
      age_recommendation: "Newborn+",
      extras: ["Easy setup", "Compact design", "Stylish color combination"],
      images: [
        "https://i.ibb.co.com/J7Yn5LP/5-4.webp",
        "https://i.ibb.co.com/c6FWPQR/5-2.webp",
        "https://i.ibb.co.com/BfnX8G5/5-3.webp",
        "https://i.ibb.co.com/J7Yn5LP/5-4.webp",
        "https://i.ibb.co.com/c6FWPQR/5-2.webp",
      ],
      review: {
        reviewer: "Emily Davis",
        rating: 4,
        review_text: "Good quality, but the size is a bit large for newborns.",
        date: "2024-12-07",
      },
    },
  ];

  // Using useQuery to simulate fetching static product array
  const {
    data: fetchedProducts = products,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      return products;
    },
    onError: (err) => {
      console.error("Error fetching product data:", err);
    },
  });

  return [fetchedProducts, refetch, isLoading, error];
};

export default useDemoProducts;
