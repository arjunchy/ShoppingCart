const productExample = {
  id: 1,
  title: "Sample Product",
  description: "This is a sample product",
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 20,
  brand: "Sample Brand",
  category: "Sample Category",
  thumbnail: "thumbnail.jpg",
  images: ["image1.jpg", "image2.jpg"]
};

const cartItemExample = {
  ...productExample,
  quantity: 2
};

const productsResponseExample = {
  products: [productExample],
  total: 1,
  skip: 0,
  limit: 10
};

const sortOption = 'price-low';