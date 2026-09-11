import { Link } from "react-router-dom";
import useFetch from "./UseFetch";

const Home = () => {
  const { data: categories, loading, error } = useFetch("http://127.0.0.1:8000/category");

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories) return null;

  return (
    <>
      <img className="banner" src="/images/banner.jpeg" alt="banner" />

      <section className="categories">
        <h2 className="category-title">Shop By Age</h2>
        <div className="category">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="category-container"
            >      
              <img
                className="category-image"
                src={`/images/${category.image}`}
                alt={category.age}
              />
               <h3 >{category.age}</h3> 
             
            
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;