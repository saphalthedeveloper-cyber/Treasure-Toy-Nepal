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
<div className="category-header">
        <h1>Find the Perfect <span>Treasure</span> <br /> for Your Child </h1>
       
        <p>
          Choose an age group to explore toys and learning kits designed <br /> for every stage of their amazing journey
        </p>
      </div>

      <div className="category-page">

      
        
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="category-card"
              style={{ backgroundColor: category.color }}
            >      
              <img
                className="category-image"
                src={`/images/${category.image}`}
                alt={category.age}
              />
              <div className="category-content">
        <h2>{category.age}</h2>
        <p>{category.title}</p>

        <button>
          Explore →
        </button>
      </div>
            
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;