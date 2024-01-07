


import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(`https://localhost:32768/api/SpoonTacularAPI/search?query=${query}&number=10`)
        .then(response => setRecipes(response.data))
        .catch(error => console.error('Error fetching data: ', error));
    }
  }, [query]);

  if (!query) {
    return <div>Please enter a search query.</div>;
  }

  return (
    <div className="bg-white py-16 sm:py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* ... Your existing HTML structure ... */}
        <div className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map(recipe => (
  <div key={recipe.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <div className="w-full h-48 overflow-hidden">
      <img className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" src={recipe.image} alt={recipe.title} />
    </div>
    <div className="p-4 bg-gradient-to-b from-transparent to-gray-50">
      <h4 className="font-bold text-md text-gray-800 mb-2 truncate text-center">{recipe.title}</h4>
      <div className="mt-4 flex justify-center">
        <Link to={`/recipe/${recipe.id}`} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300">
          View Recipe
        </Link>
      </div>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

