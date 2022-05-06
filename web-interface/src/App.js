
import './App.css';

async function App() {
  const data = await fetch("../../../api/date?date=2022_05_06", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Failed logging in");
      console.log(err);
    });
  console.log(data.body)
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
