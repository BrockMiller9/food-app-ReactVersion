
import NavBar from './components/NavBar.jsx'
import './App.css'
import Home from './components/Home.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail.jsx';
import SearchResults from './components/SearchResults.jsx';

function App() {

  return (
    <>
      <div className="App">
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
    </div>
    </>
  )
}

export default App
