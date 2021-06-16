const Pagination = ({ items, pageSize, onPageChange }) => {
  const { Button } = ReactBootstrap;
//  console.log("items: ", items);
  if (items.length <= 1) return null;

  let num = Math.ceil(items.length / pageSize);
//  console.log("num: ", num, " | items.length: ", items.length, " | pageSize: ", pageSize);
  let pages = range(1, num + 1);
  const list = pages.map(page => {
    return (
      <Button key={page} onClick={onPageChange} className="page-item">
        {page}
      </Button>
    );
  });
  return (
    <nav>
      <ul className="pagination">{list}</ul>
    </nav>
  );
};
const range = (start, end) => {
//  console.log("start: ", start, " | end: ", end);
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};
function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}
const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });
 
  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  console.log("State-Z: ", state);
  return [state, setUrl];
};

const useZipDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [zipUrl, setZipUrl] = useState(initialUrl);

  const [zipState, zipDispatch] = useReducer(zipDataFetchReducer, {
    isZipLoading: false,
    isZipError: false,
    zipData: initialData
  });

//  console.log("In useZipDataApi()");
//  console.log("zipURL: ", zipUrl);
 
  useEffect(() => {
    let didCancel = false;
    const fetchZipData = async () => {
      zipDispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(zipUrl);
        if (!didCancel) {
          zipDispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          zipDispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchZipData();
    return () => {
      didCancel = true;
    };
  }, [zipUrl]);
  console.log("zipState: ", zipState);
  return [zipState, setZipUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const zipDataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isZipLoading: true,
        isZipError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isZipLoading: false,
        isZipError: false,
        zipData: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isZipLoading: false,
        isZipError: true
      };
    default:
      throw new Error();
  }
};


// App that gets data from Hacker News url
function App() {
  const locationUrl = "https://safe-garden-46574.herokuapp.com/dataservice.accuweather.com/locations/v1/postalcodes/US/search";
  const forecastUrl = "https://safe-garden-46574.herokuapp.com/dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const apiKey = "?apikey=3A7PInCRXCG8DBM1kDS0V6OoKKA5xwAQ";
  const imageUrl = "https://developer.accuweather.com/sites/default/files/";

  const [perPage, setPerPage] = React.useState(10);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const pageSize = 10;

  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState("06385");
  const [codeQuery, setCodeQuery] = useState("2208412");
  const [currentPage, setCurrentPage] = useState(1);

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://safe-garden-46574.herokuapp.com/dataservice.accuweather.com/forecasts/v1/daily/5day/2208412?apikey=3A7PInCRXCG8DBM1kDS0V6OoKKA5xwAQ",
    {
      Headline: {},
      DailyForecasts: [
        { Date: "", Day: {}, EpochDate: 0, Link: "", MobileLink: "", Day: {}, Night: {}, Sources: [], Temperature: {Maximum: {Value: 1, Unit: "F", UnitType: 18},  Minimum: {Value: 0, Unit: "F", UnitType: 18}}},
        { Date: "", Day: {}, EpochDate: 0, Link: "", MobileLink: "", Day: {}, Night: {}, Sources: [], Temperature: {Maximum: {Value: 1, Unit: "F", UnitType: 18},  Minimum: {Value: 0, Unit: "F", UnitType: 18}}},
        { Date: "", Day: {}, EpochDate: 0, Link: "", MobileLink: "", Day: {}, Night: {}, Sources: [], Temperature: {Maximum: {Value: 1, Unit: "F", UnitType: 18},  Minimum: {Value: 0, Unit: "F", UnitType: 18}}},
        { Date: "", Day: {}, EpochDate: 0, Link: "", MobileLink: "", Day: {}, Night: {}, Sources: [], Temperature: {Maximum: {Value: 1, Unit: "F", UnitType: 18},  Minimum: {Value: 0, Unit: "F", UnitType: 18}}},
        { Date: "", Day: {}, EpochDate: 0, Link: "", MobileLink: "", Day: {}, Night: {}, Sources: [], Temperature: {Maximum: {Value: 1, Unit: "F", UnitType: 18},  Minimum: {Value: 0, Unit: "F", UnitType: 18}}}
      ]
    }
  );

  const [{ zipData, isZipLoading, isZipError }, doZipFetch] = useZipDataApi(
    "https://safe-garden-46574.herokuapp.com/dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=3A7PInCRXCG8DBM1kDS0V6OoKKA5xwAQ&q=06385",
    [
      {Version: "1",
       Key: "2381_PC",
       Type: "PostalCode",
       Rank: 105,
       LocalizedName: "Waterford",
       EnglishName: "Waterford",
       Region: {},
       Country: {},
       AdministrativeArea: {ID: "CT", LocalizedName: "Connecticut", EnglishName: "Connecticut", Level: 1, LocalizedType: "State"},
       TimeZone: {},
       GeoPosition: {},
       IsAlias: false,
       ParentCity: {},
       SupplementalAdminAreas: [],
       Datasets: [],
      } 
    ]
  );

  const [maxTemps, setMaxTemps] = React.useState([1, 1, 1, 1, 1]);
  const [minTemps, setMinTemps] = React.useState([0, 0, 0, 0, 0]);

  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let today = new Date();
  console.log("date: ", today);

/*  function getLocationCode(zipCode){
    let newUrl = locationUrl + apiKey + "&q=" + zipCode;
    console.log ("newUrl: ", newUrl);
    doZipFetch(newUrl);
    console.log("zip Fetch: ", newUrl);  
  }
*/
  console.log("data: ", data);
  console.log("forecast: ", data.DailyForecasts[0].Temperature.Maximum);
  console.log("zip data: ", zipData);
  console.log("the Code: ", zipData[0].ParentCity.Key);


  const handlePageChange = e => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data.DailyForecasts;
  if (page.length >= 1) {
    page = paginate(page, currentPage, itemsPerPage);
//    console.log(`currentPage: ${currentPage}`);
  }
  return (
    <Fragment>
      <div className="directions">
        Enter Zip Code
      </div>
      <form
        className="zipForm"
        onSubmit={event => {
          doZipFetch(locationUrl + apiKey + "&q=" + query);
          event.preventDefault();
          doFetch(forecastUrl +  zipData[0].ParentCity.Key + apiKey);
          console.log("data 1: ", data);  
          event.preventDefault();
        }}
      >
        <div className="zipDiv">
        <input
          className="zipInput"
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit" className="zipButton">Enter</button>
        </div>
      </form>

        

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <div className="location">
            {zipData[0].LocalizedName}, {zipData[0].AdministrativeArea.ID}
          </div>

          <div className="wrapper" key="0">
            <div className="one" key="1">
              <div className="eleven" key="11">
                {dayOfWeek[today.getDay()]}
              </div>
              <div className="twenty-one" key="21">
                {data.DailyForecasts[0].Temperature.Maximum.Value}
                {data.DailyForecasts[0].Temperature.Maximum.Unit}
              </div>
              <div className="thirty-one" key="31">
                <img src={`/icons/${data.DailyForecasts[0].Day.Icon}-s.png`}></img>
              </div>
              <div className="forty-one" key="41">
                {data.DailyForecasts[0].Day.IconPhrase}
              </div>
              <div className="fifty-one" key="51">
                {data.DailyForecasts[0].Temperature.Minimum.Value}
                {data.DailyForecasts[0].Temperature.Minimum.Unit}
              </div>
              <div className="sixty-one" key="61">
                <img src={`/icons/${data.DailyForecasts[0].Night.Icon}-s.png`}></img>
              </div>
              <div className="seventy-one" key="71">
                {data.DailyForecasts[0].Night.IconPhrase}
              </div>
            </div>
            <div className="two" key="2">
              <div className="twelve" key="12">
                {dayOfWeek[(today.getDay() + 1) % 7]}
              </div>
              <div className="twenty-two" key="22">
                {data.DailyForecasts[1].Temperature.Maximum.Value}
                {data.DailyForecasts[1].Temperature.Maximum.Unit}
              </div>
              <div className="thirty-two" key="32">
                <img src={`/icons/${data.DailyForecasts[1].Day.Icon}-s.png`}></img>
              </div>
              <div className="forty-two" key="42">
                {data.DailyForecasts[1].Day.IconPhrase}
              </div>
             <div className="fifty-two" key="52">
                {data.DailyForecasts[1].Temperature.Minimum.Value}
                {data.DailyForecasts[1].Temperature.Minimum.Unit}
              </div>
              <div className="sixty-two" key="62">
              <img src={`/icons/${data.DailyForecasts[1].Night.Icon}-s.png`}></img>
              </div>
              <div className="seventy-two" key="72">
                {data.DailyForecasts[1].Night.IconPhrase}
              </div>
            </div>
            <div className="three" key="3">
              <div className="thirteen" key="13">
                {dayOfWeek[(today.getDay() + 2) % 7]}
              </div>
              <div className="twenty-three" key="23">
                {data.DailyForecasts[2].Temperature.Maximum.Value}
                {data.DailyForecasts[2].Temperature.Maximum.Unit}
              </div>
              <div className="thirty-three" key="33">
                <img src={`/icons/${data.DailyForecasts[2].Day.Icon}-s.png`}></img>
              </div>
              <div className="forty-three" key="43">
                {data.DailyForecasts[2].Day.IconPhrase}
              </div>
              <div className="fifty-three" key="53">
                {data.DailyForecasts[2].Temperature.Minimum.Value}
                {data.DailyForecasts[2].Temperature.Minimum.Unit}
              </div>
              <div className="sixty-three" key="63">
                <img src={`/icons/${data.DailyForecasts[2].Night.Icon}-s.png`}></img>
              </div>
              <div className="seventy-three" key="73">
                {data.DailyForecasts[2].Night.IconPhrase}
              </div>
            </div>
            <div className="four" key="4">
              <div className="fourteen" key="14">
                {dayOfWeek[(today.getDay() + 3) % 7]}
              </div>
              <div className="twenty-four" key="24">
                {data.DailyForecasts[3].Temperature.Maximum.Value}
                {data.DailyForecasts[3].Temperature.Maximum.Unit}
                </div>
              <div className="thirty-four" key="34">
                <img src={`/icons/${data.DailyForecasts[3].Day.Icon}-s.png`}></img>
              </div>
              <div className="forty-four" key="44">
                {data.DailyForecasts[3].Day.IconPhrase}
              </div>
              <div className="fifty-four" key="54">
                {data.DailyForecasts[3].Temperature.Minimum.Value}
                {data.DailyForecasts[3].Temperature.Minimum.Unit}
              </div>
              <div className="sixty-four" key="64">
                <img src={`/icons/${data.DailyForecasts[3].Night.Icon}-s.png`}></img>
              </div>
              <div className="seventy-four" key="74">
                {data.DailyForecasts[3].Night.IconPhrase}
              </div>
            </div>
            <div className="five" key="5">
              <div className="fifteen" key="15">              
                {dayOfWeek[(today.getDay() + 4) % 7]}
              </div>
              <div className="twenty-five" key="25">
                {data.DailyForecasts[4].Temperature.Maximum.Value}
                {data.DailyForecasts[4].Temperature.Maximum.Unit}
              </div>
              <div className="thirty-five" key="35">
                <img src={`/icons/${data.DailyForecasts[4].Day.Icon}-s.png`}></img>
              </div>
              <div className="forty-five" key="45">
                {data.DailyForecasts[4].Day.IconPhrase}
              </div>
              <div className="fifty-five" key="55">
                {data.DailyForecasts[4].Temperature.Minimum.Value}
                {data.DailyForecasts[4].Temperature.Minimum.Unit}
              </div>
              <div className="sixty-five" key="65">
                <img src={`/icons/${data.DailyForecasts[4].Night.Icon}-s.png`}></img>
              </div>
              <div className="seventy-four" key="74">
               {data.DailyForecasts[4].Night.IconPhrase}
              </div>
            </div>
          </div>

        </div>

      )}

    </Fragment>
  );
}

/*  
<Pagination
items={data.DailyForecasts}
pageSize={itemsPerPage}
onPageChange={handlePageChange}
></Pagination>
*/

/*
<ul className="list">
{page.map(item => (
  <li className="listItem" key={item.EpochDate}>
    <a href={item.link}>{item.Day.IconPhrase}</a>
  </li>
))}
</ul>
*/
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
