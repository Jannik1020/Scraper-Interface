import { useEffect, useState } from "react";
import "./App.css";

function App(props) {
  const initTable = (
    <thead key="head">
      <tr>
        <th>Hour</th>
        <th>Buy Volume</th>
        <th>Sell Volume</th>
        <th>Volume</th>
        <th>Price</th>
      </tr>
    </thead>
  );

  const [table, setTable] = useState([
    initTable
  ]);

  const [init, setInit] = useState(true)

  async function getDate(cdate) {
    const date = cdate.replace(/-/g, "_");
    const data = await fetch(
      "https://scraper-interface.vercel.app/api/date/" + date,
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
    return data.body;
  }

  useEffect(() => {
    document.getElementById("dPicker").value = props.max
      .substring(1)
      .replace(/_/g, "-");
    async function fetchDate () {
      var data = await getDate(document.getElementById("dPicker").value)

      setTable([
        initTable,
        <tbody key="tbody">
          {data.map((row) => {
            return (
              <tr key={row.hour}>
                <td>
                  {row.hour - 1} - {row.hour}
                </td>
                <td>{row.buy_volume}</td>
                <td>{row.sell_volume}</td>
                <td>{row.volume}</td>
                <td>{row.price}</td>
              </tr>
            );
          })}
        </tbody>,
      ]);
    }

    fetchDate()
    
    
  }, [init, props.max]);

  async function handleConfirm(e) {
    e.preventDefault();
    var date_data = await getDate(document.getElementById("dPicker").value);
    setTable([
      initTable,
      <tbody key="tbody">
        {date_data.map((row) => {
          return (
            <tr key={row.hour}>
              <td>
                {row.hour - 1} - {row.hour}
              </td>
              <td>{row.buy_volume}</td>
              <td>{row.sell_volume}</td>
              <td>{row.volume}</td>
              <td>{row.price}</td>
            </tr>
          );
        })}
      </tbody>,
    ]);
  }

  return (
    <div className="App">
      <input
        type="date"
        id="dPicker"
        min={props.min.substring(1).replace(/_/g, "-")}
        max={props.max.substring(1).replace(/_/g, "-")}
        onChange={handleConfirm}
      ></input>
      <table id="data_table">
        {
          table

          /*(date_data !== undefined ) ? date_data.map(row => {
        return <tr>
          <td>{row.hour-1} - {row.hour}</td>
          <td>{row.buy_volume}</td>
          <td>{row.sell_volume}</td>
          <td>{row.volume}</td>
          <td>{row.price}</td>
        </tr>
      }):
      ""*/
        }
      </table>
    </div>
  );
}

export default App;
