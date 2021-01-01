import React,{useEffect, useState} from 'react';
import './App.css';


function useFetch(url, defaultResponse) {
  const [data, setData] = useState(defaultResponse);


  async function getDataApi(url) {

    try {
      const res = await fetch(url);
      const data = await res.json();

      setData({
        isLoading: false,
        data
      })
    } catch (event) {
      console.log(event);
    }
  }

    useEffect(() => {
      getDataApi(url);
    }, [url]);

}


export default function App(data) {

  const randomId = Math.floor((Math.random() * 10) + 1);
  const apiEndpoint = `https://regres.in/api/users/${randomId}`;
  const userFetchRes = useFetch(apiEndpoint, {isLoading: true, data: null });

  if (!userFetchRes.data || userFetchRes.isLoading) {
    return 'Loading...';
  }

  const {first_name, last_name} = userFetchRes.data.data;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Name: {first_name} {last_name}</h3>
        </div>
      </header>
    </div>
  );
}
