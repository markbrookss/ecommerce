const products = [
  {
    id: 0,
    image: "./assets/images/product-1.jpg",
    title: "Red T-Shirt",
    price: 120,
  },
  {
    id: 1,
    image: "./assets/images/product-2.jpg",
    title: "Sport sneakers",
    price: 100,
  },
  {
    id: 2,
    image: "./assets/images/product-3.jpg",
    title: "Colorful socks",
    price: 20,
  },
  {
    id: 3,
    image: "./assets/images/product-4.jpg",
    title: "Sport Watch",
    price: 20,
  },
];
localStorage.setItem("product", JSON.stringify(products));
