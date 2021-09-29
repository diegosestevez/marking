const API = async () => {
 const fetchData = await fetch('http://localhost:8000/');
 const response = await fetchData.json();

 console.log(response);
}

API();

function App() {
  return (
    <p> Hello from the react app. Open the console to see that I am fetching data from the server using CORS</p>
  );
}

export default App;
