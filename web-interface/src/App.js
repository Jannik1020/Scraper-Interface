
import './App.css';

async function App() {
  const date = new Date();
  const dateString = date.toISOString().split('T')[0].replace(/-/g, "_")
  const data = await fetch("../../../api/date/" + dateString, {
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
      {data}
    </div>
  );
}

export default App;
