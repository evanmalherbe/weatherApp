/* HyperionDev Full Stack Web Development Bootcamp - Level 2 - Task 14 - Weather app */

import React from 'react';

//import in order to use the Fetch API
import 'isomorphic-fetch';

// Import logo image
import logo from './weatherLogo.png';

// Import react Bootstrap components
import Form from 'react-bootstrap/Form';
import { FormGroup, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

// Import bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// import custom stylesheet
import './App.css';

// Create class component so I can used state variables
class App extends React.Component {
  constructor(props) {
    super(props);

    // Define state variables
    this.state = {
        error: null,
        isLoaded: false,
        items: [],
        city: null
    };

    // Binding to make "this" work
    this.getWeather = this.getWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createOutput = this.createOutput.bind(this);
    this.displayPage = this.displayPage.bind(this);

  }

  /* Function to fetch weather data from open weather and save it in state array "items". Used the following website
  to help me rectify an error I kept getting: 
  https://stackoverflow.com/questions/49966496/error-unexpected-token-in-json-at-position-0 */
  getWeather(city) {
    // save api key identifying me to the open weather site
    let key = "8a51edc7b205b8b654baf3b4ff562350";

    // Only fetch data if user has entered a city into the form (and not a blank space)
    if (city !== null && city !== undefined) {
      // call fetch function to get data from open weather (using user entered city and making results in centigrade)
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + key)
      // use json method to convert to data to an object
      .then(res => res.json())
      // Deal with result by specifying what to do if successful or not. If success, save data to state array, if not, 
      // create error message
      .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
                
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })

    // End of if statement to check if "city" is not null
    } else {
      console.log("City is null or key undefined")
    }
   // End of getWeather() function
  }

  // Add user specified city to city variable in state
  handleChange(event) {
    this.setState({city: event.target.value});
  }

  // Call the getweather function with the city name as a parameter when user clicks the submit button
  handleSubmit() {
    this.getWeather(this.state.city);
  }

  /* function to display data fetched from open weather. If error, display error message. If info hasn't loaded yet,
  display "awaiting input..." message. If data is present, display in sentence. */
  createOutput() {
    const { error, isLoaded, items } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;

    } else if (!isLoaded) {
        return <div>Awaiting input...</div>;

    } else if (items !== undefined) { 
        
        return (

        // Looked here to know how to bold certain words, since <b> didn't work:
        // https://forum.freecodecamp.org/t/bold-certain-words-in-an-array-and-display-them-in-react/252676/5
          <ul>
              <li>In <strong>{this.state.city}</strong></li>
             <li>The weather is: <strong>{items.weather[0].description}</strong></li>
             <li>Temperature: <strong>{items.main.temp}</strong> Centigrade</li>
             <li>Max temperature: <strong>{items.main.temp_max}</strong> Centigrade</li>
          </ul>
         /*
          <p>{"The weather in " + this.state.city + " is: " + <b>items.weather[0].description</b>  , with a temperature of ${items.main.temp} C. The expected max temperature for today will be ${items.main.temp_max} C.`}</p> */
        );

    } else {
        return <p>No result yet. Hang in there.</p>
    }

  // End of createoutput function
  }

  // function to display divs and form on page. Looked at this website to remind myself about Bootstrap Forms:
  // https://react-bootstrap.netlify.app/components/forms/
  displayPage() {
    return (
      <div className="App">
          <header className="App-header">
              <img className="logoImg" src={logo} alt="logo"/>
              <h1>Weather App</h1>
            </header>
            <div className="container">
              <div className="input">
                <h2>Choose a city to see the weather there</h2>
                <Form>
                  <FormGroup className="mb-3">
                    <Form.Label >Enter City Name:</Form.Label>
                    <FormControl type="text" placeholder="City name..." id="cityInput" onChange={this.handleChange}/>
                  </FormGroup>

                  <Button variant="primary" onClick={this.handleSubmit}>Get Weather</Button>
                </Form>
              </div>
              <div className="output">
                {this.createOutput()}
              </div>
            </div>
      </div>
    );
  }

  /* Reminded myself of the syntax of forms here:
  https://www.w3schools.com/html/html_form_input_types.asp */
  render() {
    
      return (
        <div>
           {this.displayPage()}
        </div>

       //End of return
      );

   // End of render()
  }

// End of class App
}

// Export app component to be used by index.js
export default App;
