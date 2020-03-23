import React from 'react';
import '../css/form.css';

const From = props => {
    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.loadData}>
                <div className="row">
                    <div className="col-md-3 offset-md-3">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City Name (e.g. London)" />
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country Name (e.g. PK, UK)" />
                    </div>
                    <div className="col-md-3 mt-md-0 py-2 text-md-left">
                        <button className="btn btn-info">See Weather</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

function error() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country Name
        </div>
    );
}

export default From;