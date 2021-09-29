import Routes from './Components/Router';
import Navagation from './Components/Navagation';

// const API = async () => {
//  const fetchData = await fetch('http://localhost:8000/');
//  const response = await fetchData.json();

//  console.log(response);
// }

// API();

function App() {
  return (
    <>
    <Navagation/>
    <Routes/>
    </>
  );
}

export default App;
