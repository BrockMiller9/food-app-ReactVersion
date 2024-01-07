import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';




const RecipeDetail = () => {
    const { id } = useParams(); // Get the recipe ID from URL parameters
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:32768/api/SpoonTacularAPI/${id}?includeNutrition=false`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe details: ', error));
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>; // Or any other loading state representation
    }

    const getImageUrl = (imageName) => {
        const size = '100x100'; // Adjust the size as needed
        return `https://spoonacular.com/cdn/ingredients_${size}/${imageName}`;
    };

    return (
      <div className="bg-white">
        {/* Hero Section */}
        <div className="pt-6 sm:pt-10 lg:pt-16 bg-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Image container */}
              <div className="flex-shrink-0 mb-4 lg:mb-0 lg:w-1/2 lg:pr-4">
                <img
                  className="rounded-lg shadow-lg h-48 w-full object-cover lg:h-auto"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </div>
  
              {/* Details container */}
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {recipe.title}
                </h2>
                <div className="mt-4">
                  <span className="text-lg text-gray-600">
                    {recipe.servings} servings
                  </span>
                  <span className="ml-4 text-lg text-gray-600">
                    {recipe.readyInMinutes} minutes
                  </span>
                  {/* Include other details like healthScore, etc., if available */}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Price per serving: ${recipe.pricePerServing.toFixed(2)}
                </p>
                {/* Favorite button and other interactive elements */}
              </div>
            </div>
          </div>
        </div>
  
        {/* Ingredients and Preparation/Steps Section */}
        <div className="mt-6 px-4 sm:mt-10 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Ingredients Section */}
            <div className="lg:w-1/2">
              <h2 className="text-xl font-semibold border-b-4 pb-2 border-indigo-500/100">
                Ingredients
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index} className="flex space-x-4 items-center">
                    <img
                      src={getImageUrl(ingredient.image)}
                      alt={ingredient.name}
                      className="h-12 w-12 object-cover rounded-full"
                    />
                    <div className="flex-auto">
                      <h3 className="capitalize font-semibold">
                        {ingredient.nameClean}
                      </h3>
                      <p className="text-gray-500 capitalize">
                        {ingredient.amount} {ingredient.measures.unitShort}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
  
              {/* Preparation */}
              <div>
                <h2 className="text-xl font-semibold border-b-4 pb-2 border-indigo-500/100">
                  Preparation
                </h2>
                <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
              </div>
            </div>
  
            {/* Steps Section */}
            {recipe.analyzedInstructions.length > 0 && (
              <div className="lg:w-1/2 bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-semibold border-b-4 pb-2 border-indigo-500/100">
                  Instructions
                </h2>
                <ul className="mt-4 space-y-2">
                  {recipe.analyzedInstructions[0].steps.map((step, index) => (
                    <li key={index} className="mt-2">
                      <span className="font-bold text-indigo-600">Step {index + 1}:</span>
                      <p className="mt-1">{step.step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
  
        {/* Additional Details */}
        <div className="mt-6 px-4 sm:mt-10 sm:px-6 md:px-8">
          <a
            href={recipe.sourceUrl}
            className="text-indigo-600 hover:underline"
          >
            View full recipe
          </a>
        </div>
      </div>
    );
  };

  export default RecipeDetail
  