import { useState, useEffect } from 'react'
import './App.css';


function App() {
  const [now, setNow] = useState(new Date())
  const [SGtime, setSGTime] = useState("--:--")
  const [UKtime, setUKTime] = useState("--:--")
  const [Deltatime, setDeltaTime] = useState(7)

  const [CurrentUKTime, setCurrentUKTime] = useState()
  const [CurrentSGTime, setCurrentSGTime] = useState()

  const checkLength = (hr) => {
    console.log(hr.length)
    if (hr.length == 1) {
      return "0" + hr
    }
    else {
      return hr
    }
  }

  const checkIfNegativeForSG = (num) => {    // ((hr - Deltatime) % 24).toString() minus first then get negative then modulo and then +24 
    const minused = (num - Deltatime) % 24;
    if(minused < 0){
      return minused + 24;
    }
    else{
      return minused;
    }
  }

  const UKtoSG = (time) => {  // changes UK time to SG 
    const hr = parseInt(time.slice(0, -3))
    const hrConverted = checkLength(((hr + Deltatime) % 24).toString())
    const min = (time.slice(3, 6))
    const stringTime = hrConverted + ":" + min
    setSGTime(stringTime)
    setUKTime("--:--")
  }
  const SGtoUK = (time) => {  // changes SG time to UK
    const hr = parseInt(time.slice(0, -3))
    const hrConverted = checkLength((checkIfNegativeForSG(hr)).toString())
    const min = (time.slice(3, 6))
    const stringTime = hrConverted + ":" + min
    setUKTime(stringTime)
    setSGTime("--:--")
  }

  const getTimeZone = (timezone) => {
    let date = now.toLocaleString("en-GB", { timeZone: timezone, timeStyle: "short", });
    console.log('Time in ' + timezone + ': ' + date);
    return date
  }


  return (
    <>
      <div className="container app-container my-5">
        <div className="rounded-top p-4">
          <div className="row text-center">
            <div className="col-auto mx-auto">
              <h4>London</h4>
              <h5>{getTimeZone("Europe/London")}</h5>
            </div>
            <div className="col-auto mx-auto">
              <h4>Singapore Hello test</h4>
              <h5>{getTimeZone("Asia/Singapore")}</h5>
            </div>
          </div>
        </div>

        <div className="p-4">
          <form className="row text-center d-flex justify-content-center">
            <div className="col-4 mx-auto">
              <label className="form-label" htmlFor="UKtimeinput">UK Time</label>
              <input type="time" className="form-control" id="UKtimeinput" onChange={(e) => UKtoSG(e.target.value)} />
            </div>
            <div className="col-4 mx-auto">
              <label className="form-label" htmlFor="SGtimeinput">SG Time</label>
              <input type="time" className="form-control" id="SGtimeinput" onChange={(e) => SGtoUK(e.target.value)} />
            </div>
          </form>
        </div>

        <div className="rounded-bottom rounded-3 p-4">
          <div className="row text-center">
            <div className="col-auto mx-auto">
              <h5>The time in UK would be:</h5>
              <h5>{UKtime}</h5>
            </div>
            <div className="col-auto mx-auto">
              <h5>The time in SG would be:</h5>
              <h5>{SGtime}</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid py-2 fixed-bottom">
        <footer class="footer text-center">
          <span class="text-muted"><small>All rights reserved. Siddharth Gurung and Daniel Olaszy, 2021</small></span>
        </footer>
      </div>

    </>
  );
}

export default App;
