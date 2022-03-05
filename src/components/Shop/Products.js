import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/products.json");
        if (!response.ok) throw new Error("Couldn't fetch products data!");
        const data = await response.json();
        const loadedProducts = [];
        for (const key in data) {
          loadedProducts.push({ id: key, price: data[key].price, title: data[key].title, description: data[key].description });
        }
        setProductsList(loadedProducts);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  let content = <p className={classes.content}>Found no products!</p>;
  if (productsList.length > 0)
    content = (
      <ul>
        {productsList.map(product => (
          <ProductItem key={product.id} id={product.id} title={product.title} price={product.price} description={product.description} />
        ))}
      </ul>
    );
  if (error) content = <p className={classes.error}>{error}</p>;
  if (isLoading) content = <p className={classes.content}>Loading...</p>;

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {content}
    </section>
  );
};

export default Products;
