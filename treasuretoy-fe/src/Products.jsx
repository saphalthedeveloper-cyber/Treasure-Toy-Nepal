import { useNavigate } from "react-router-dom";
import useFetch from "./UseFetch"
const Products = () => {
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetch("http://127.0.0.1:8000/products");

   const handleBuyNow = () => {
    navigate('/orders');
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="product-title">Featured Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="products-container">
            <img className="product-image" src={`/images/${product.image}`} alt="product" />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>
        ))}
      </div>
    </>
  );
};


export default Products;