import "./App.css";

function App(props) {

  function handleConfirm(e) {
    e.preventDefault();

    var chosenDate = document.getElementById("dPicker").value
    console.log(chosenDate)

    async function getDate() {
      const date = chosenDate.replace(/-/g, "_");
      const data = await fetch(
        "https://scraper-interface.vercel.app/api/" + date,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          console.log("Failed logging in");
          console.log(err);
        });
      console.log(data.body);
    }
    
    getDate()
     
  }

  console.log(props.min.substring(1).replace(/_/g, "-"));
  return (
    <div className="App">
      <input
        type="date"
        id="dPicker"
        min={props.min.substring(1).replace(/_/g, "-")}
        max={props.max.substring(1).replace(/_/g, "-")}
      ></input>
      <button onClick={handleConfirm}>Bestätigen</button>
    </div>
  );
}

export default App;
