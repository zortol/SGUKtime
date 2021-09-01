import { useState, useEffect } from 'react'
import './App.css';


function App() {
  const [now, setNow] = useState(new Date())
  const [SGtime, setSGTime] = useState()
  const [UKtime, setUKTime] = useState()
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



  const UKtoSG = (time) => {  // changes UK time to SG 
    const hr = parseInt(time.slice(0, -3))
    const hrConverted = checkLength(((hr + Deltatime) % 24).toString())
    const min = (time.slice(3, 6))
    const stringTime = hrConverted + ":" + min
    setSGTime(stringTime)
  }
  const SGtoUK = (time) => {  // changes SG time to UK
    const hr = parseInt(time.slice(0, -3))
    const hrConverted = checkLength(((hr - Deltatime) % 24).toString())
    const min = (time.slice(3, 6))
    const stringTime = hrConverted + ":" + min
    setUKTime(stringTime)
  }

  const getTimeZone = (timezone) => {
    let date = now.toLocaleString("en-GB", { timeZone: timezone, timeStyle: "short", });
    console.log('Date in ' + timezone + ': ' + date);
    return date
  }

  const getTimeZoneName = (timezone) => {
    let date = now.toLocaleString("en-GB", { timeZoneName: "long", timeZone: timezone });
    return date
  }


  useEffect(() => {
    getTimeZone("Europe/London")
    getTimeZone("Asia/Singapore")

  }, [0])

  return (<>

    <div className="container">
      <div className="row my-5 text-center">
        <div className="col-auto mx-auto">
          <h4>London</h4>
          <h5>{getTimeZone("Europe/London")}</h5>
        </div>
        <div className="col-auto mx-auto">
          <h4>Singapore</h4>
          <h5>{getTimeZone("Asia/Singapore")}</h5>
        </div>
      </div>
    </div>

    <div className="Container">
      <form className="row my-3 text-center">
        <div className="col-auto mx-auto">
          <label className="form-label" htmlFor="UKtimeinput">UK Time</label>
          <input type="time" className="form-control" id="UKtimeinput" onChange={(e) => UKtoSG(e.target.value)} />
        </div>
        <div className="col">
          <label className="form-label" htmlFor="SGtimeinput">SG Time</label>
          <input type="time" className="form-control" id="SGtimeinput" onChange={(e) => SGtoUK(e.target.value)} />
        </div>
      </form>
    </div>

    <div className="container">
      <div className="row my-5 text-center">
        <div className="col-auto mx-auto">
          <h4>The time in UK would be:</h4>
          <h5>{UKtime}</h5>
        </div>
        <div className="col-auto mx-auto">
          <h4>The time in SG would be:</h4>
          <h5>{SGtime}</h5>
        </div>
      </div>
    </div>


  </>
  );
}

export default App;
