import { useParams } from "react-router-dom";
import useFetch from "./UseFetch";
import { useNavigate } from "react-router-dom";


const Category = () => {
  const { id } = useParams();
  const { data: category, loading, error } = useFetch(`http://127.0.0.1:8000/category/${id}`);
const navigate = useNavigate();
const handleBuyNow = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/users/login");
    return;
  }
}
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!category) return null;

  return (
    <section className="category-detail">
      <h2>{category.age}</h2>

      <div className="products">
        {category.products.map((product) => (
          <div key={product.id} className="products-container">
            <img
              className="product-image"
              src={`/images/${product.image}`}
              alt={product.name}
            />
            <h4>{product.name}</h4>
            <p className="product-price">Rs. {product.price}</p>
             <button  onClick={handleBuyNow} >Buy Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;