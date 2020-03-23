import React from 'react';

const Weather = props => {
    return (
        <div className="container text-light">
            <div className="cards">
                <h1>{props.city}</h1>
                <h4 className="py-3">{props.description}</h4>
                <h5 className="py-4">
                    <i className={`wi ${props.icon} display-1`} />
                </h5>
                {props.celsius ? (<h3 className="py-2">feels like {props.celsius}&deg;C</h3>) : null}

                {minmaxTemp(props.min_temp, props.max_temp)}
                {props.pressure ? (<h3 className="py-2">pressure: {props.pressure} hPa</h3>) : null}
                {props.humidity ? (<h3 className="py-2">humidity: {props.humidity}&#37;</h3>) : null}

            </div>
        </div>
    );
};


function minmaxTemp(min, max) {
    if (min && max) {
        return (
            <h3>
                <span className="px-4">min {min}&deg;C</span>
                <span className="px-4">max {max}&deg;C</span>
            </h3>
        );
    }
}
export default Weather;