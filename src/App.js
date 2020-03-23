import React, { Component } from 'react';
import Weather from './component/weather';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/weather-icons.css";
import Form from './component/form';


const API_KEY = '01544a6a85a1db7bc0ba6323884cfde9';

class App extends Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            max_temp: undefined,
            min_temp: undefined,
            description: "",
            pressure: undefined,
            humidity: undefined,
            error: false
        };
        // this.getWeather();
        this.icon = {
            Thunderstrom: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        };
    }

    getWeatherIcon(icon, weatherId) {
        switch (true) {
            //for Thunderstrom
            case weatherId >= 200 && weatherId <= 232:
                this.setState({ icon: this.icon.Thunderstrom });
                break;
            case weatherId >= 300 && weatherId <= 321:
                this.setState({ icon: this.icon.Drizzle });
                break;
            case weatherId >= 500 && weatherId <= 531:
                this.setState({ icon: this.icon.Rain });
                break;
            case weatherId >= 600 && weatherId <= 622:
                this.setState({ icon: this.icon.Snow });
                break;
            case weatherId >= 701 && weatherId <= 781:
                this.setState({ icon: this.icon.Atmosphere });
                break;
            case weatherId === 800:
                this.setState({ icon: this.icon.Clear });
                break;
            case weatherId >= 801 && weatherId <= 804:
                this.setState({ icon: this.icon.Clouds });
                break;
        }
    }

    calCelsiusTemp(fahrenheit_temp) {
        let celsius = Math.floor(fahrenheit_temp - 273.15);
        return celsius;
    }

    getWeather = async (event) => {

        event.preventDefault();

        const city = event.target.elements.city.value;
        const country = event.target.elements.country.value;

        if (city && country) {
            const api_call = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
            );

            const response = await api_call.json();

            console.log(response);

            this.setState({
                city: `${response.name}, ${response.sys.country}`,
                celsius: this.calCelsiusTemp(response.main.feels_like),
                min_temp: this.calCelsiusTemp(response.main.temp_min),
                max_temp: this.calCelsiusTemp(response.main.temp_max),
                description: response.weather[0].description,
                pressure: response.main.pressure,
                humidity: response.main.humidity,
                error: false
            });

            this.getWeatherIcon(this.icon, response.weather[0].id);
        } else {
            this.setState({ error: true })
        }
    };

    render() {
        return (
            <div className='App'>
                <Form loadData={this.getWeather} error={this.state.error} />
                <br />
                <Weather
                    city={this.state.city}
                    country={this.state.country}
                    celsius={this.state.celsius}
                    min_temp={this.state.min_temp}
                    max_temp={this.state.max_temp}
                    description={this.state.description}
                    pressure={this.state.pressure}
                    humidity={this.state.humidity}
                    icon={this.state.icon} />
            </div >
        );
    }
}
export default App;