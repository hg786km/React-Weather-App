import "./App.css";
import { useEffect, useState } from "react";
import PlaceSharpIcon from "@mui/icons-material/PlaceSharp";
import DeviceThermostatSharpIcon from "@mui/icons-material/DeviceThermostatSharp";
import countries from "i18n-iso-countries";

function App() {
  const [apiData, setApiData] = useState({}); //FETCH API DATA
  const [getState, setGetState] = useState("tamilnadu"); // FOR INPUT FIELD ON CHANGE
  const [state, setState] = useState("tamilnadu"); // FOR FORMS ON SUBMIT

  //API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&APPID=${apiKey}`;

  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  //Side effect which is launched when the dependency array changes in this case apiUrl
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const handleInput = (e) => {
    setGetState(e.target.value);
    console.log("Input Set", e.target.value);
  };

  const handleSubmit = (e) => {
    setState(getState);
    console.log("Setting the Location", getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <main className="h-screen w-screen m-0 ">
      <h1 className="bg-blue-500 text-white font-bold uppercase text-lg px-6 py-2 my-2 rounded shadow outline-none w-1/2 mx-auto text-center">
        React Weather App by Harsh Gupta
      </h1>
      <div className="bg-gray-200 shadow-md rounded px-8 py-3 mb-2">
        <form
          id="loc-form"
          className="bg-white shadow-md rounded px-8 pt-6 pb-4 mb-4 w-1/2 mx-auto"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="location-name"
            >
              Enter Location:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location-name"
              type="text"
              placeholder="tamilnadu"
              value={getState}
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white active:bg-indigo-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSubmit}
              form="loc-form"
            >
              Search
            </button>
          </div>
        </form>
        <div className="sm:w-8/12 w-10/12 rounded overflow-hidden shadow-lg mx-auto bg-white">
          {apiData.main ? (
            <div className="w-10/12 sm:w-8/12 px-4 mx-auto">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="shadow rounded w-3/12 h-5/12 align-middle border-none mx-auto"
              />

              <div className="container mx-auto text-center py-4">
                <p className="text-gray-900 font-bold text-3xl sm:text-4xl text-center mb-2 mx-auto">
                  {kelvinToFarenheit(apiData.main.temp)}&deg; C
                </p>
                <p className="text-gray-900 font-bold text-xl mb-2 mx-auto">
                  <PlaceSharpIcon fontSize="small" /> {apiData.name}
                </p>
                <div className="flex flex-row flex-wrap">
                  <div className="w-1/2">
                    <p>
                      <DeviceThermostatSharpIcon fontSize="small" /> Min Temp{" "}
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; C{" "}
                    </p>
                    <p>
                      {" "}
                      <DeviceThermostatSharpIcon fontSize="small" /> Max Temp{" "}
                      {kelvinToFarenheit(apiData.main.temp_max)}&deg; C{" "}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/3 md:w-1/4"></div>
                  <div className="w-full sm:w-1/3 md:w-1/4">
                    <p>
                      {" "}
                      <strong>{apiData.weather[0].main}</strong>
                    </p>
                    <p>
                      <strong>
                        {" "}
                        {countries.getName(apiData.sys.country, "en", {
                          select: "official",
                        })}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
