import ReactDOM from "react-dom/client";
import React, {/*useState, useEffect*/} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {/*useMatch, useParams, */useLocation } from 'react-router-dom';

const data = [
  {filename: "cuhk-2013.jpg", year:
2013, remarks: "Sunset over CUHK"},
  {filename: "cuhk-2017.jpg", year:
2017, remarks: "Bird's-eye view of CUHK"},
  {filename: "sci-2013.jpg", year:
2013, remarks: "The CUHK Emblem"},
  {filename: "shb-2013.jpg", year:
2013, remarks: "The Engineering Buildings"},
  {filename: "stream-2009.jpg", year:
2009, remarks: "Nature hidden in the campus"},
];

class App extends React.Component{
  

  render() {
    
      return(
          <>
          <Title name={this.props.name}/>
          <BrowserRouter>
        <div>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li><Link to="/gallery">Images</Link></li>
            <li> <Link to="/slideshow">Slideshow</Link> </li>
          </ul>
        </div>

        <hr/>

        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/slideshow" element={<Slideshow />} />
          <Route path="/*" element={<NoMatch/>} />
        </Routes>
      </BrowserRouter>
          </>
      );
  }
}

class Title extends React.Component { 

render() {
  
  return (
    <header className="bg-warning">
      <h1 className="display-4 text-center">
        {this.props.name}
      </h1>
</header> 
);
} }

class FileCard extends React.Component { 

constructor(props){
  super(props);
  this.state = {selected: 0};
}

render() {
  let i = this.props.i;
     return (
<div
//Change state when the mouse is over the filecard.
onMouseOver={()=> this.setState({selected: 1})}
onMouseOut={()=> this.setState({selected: 0})}

//based on the state, adjust the size of the filecard.
 className="card d-inline-block m-2" style={{width: this.state.selected===1 ? 220 :
200}}>
<img src={"images/"+data[i].filename} className="w-100" alt="cuhk images"/>
<div className='card-body'>
<h6 className='card-title'>{data[i].filename}</h6>
<p className='card-text'>Year: {data[i].year}</p>
<div /*onClick={()=> this.showDescription(i)}*/ style={{visibility: this.state.selected===1 ? "visible" : "hidden"}}>
<br/>{data[i].remarks}
</div>
</div>
</div>)
}}

class Home extends React.Component {
  render() {
    return (
      <>
      <h2>Home</h2>
      <img src={"images/diagram.png"} className="w-100" alt="{IMG: Image of Tree Diagram}"/>
      <p>This is the Home page.</p>
      </>
    );
  }
}

class Gallery extends React.Component { 
  render() {
  return (
  <main className="container">
    {data.map((file,index) => <FileCard i={index} key={index}/>)}
  </main> );
}}

var interval = 1500; // Initiate default interval for slideshow
var intervalID; // Use an ID for setInterval function so that we can clear interval later.

class Slideshow extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {currentImageID: 0, currentInterval: interval};
    }

    startSlide() {
      console.log("slide started.");
      intervalID = setInterval(() =>{
        if(this.state.currentImageID<4){
          this.setState({currentImageID : this.state.currentImageID+1});
        }else if(this.state.currentImageID===4){
          this.setState({currentImageID : 0});
        }
      }
      , interval);
    }

    stopSlide() {
      console.log("stop initiated.");
      clearInterval(intervalID);
    }

    slowSlide() {
      console.log("slow initiated.");
      clearInterval(intervalID);
      interval = interval + 200;
      this.setState({currentInterval : interval});
      this.startSlide();
    }

    speedSlide() {
      console.log("speed initiated.");
      if(interval <= 300){
        console.log("Limit reached!");
        clearInterval(intervalID);
        interval = 200;
        this.setState({currentInterval : interval});
        this.startSlide();
      } else {
        clearInterval(intervalID);
        interval = interval - 200;
        this.setState({currentInterval: interval});
        this.startSlide();
      }
    }

  render() {
    return (
      <div>
       <h2>Slideshow</h2>
      <p>This is the Slideshow.</p> 
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item">
          <button className="btn btn-primary" onClick={() => this.startSlide()}>Start slideshow</button>
        </li>
        <li className="list-group-item">
          <button className="btn btn-primary" onClick={() => this.stopSlide()}>Stop slideshow</button>
        </li>
        <li className="list-group-item">
          <button className="btn btn-primary"  onClick={() => this.slowSlide()}>Slower</button>
        </li>
        <li className="list-group-item">
          <button className="btn btn-primary" onClick={() => this.speedSlide()}>Faster</button>
        </li>
      </ul>

      <div className="card d-inline-block m-2" style={{width:400}}>
        <img src={"images/" + data[this.state.currentImageID].filename} className="w-100" alt="cuhk images"/>
        <div className="card-body">
          <h6 className="card-title"> {data[this.state.currentImageID].filename}</h6>
        </div>
      </div>
      </div>
    );
  }

}

//NoMatch functional component
function NoMatch() {
    // useLocation() hook tells us what URL was brought into the page.
    let location = useLocation();
    return(
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App name="CUHK Pictures"/>);