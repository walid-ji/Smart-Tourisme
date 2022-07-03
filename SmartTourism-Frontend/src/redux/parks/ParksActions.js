import * as ActionTypes from "./ActionTypes";
import {baseUrl} from "../../shared/baseUrl";

export const parksLoading = () => ({
    type: ActionTypes.PARKS_LOADING
});

export const parksFailed = (errmess) => ({
    type: ActionTypes.PARKS_FAILED,
    payload: errmess
});

export const addParks = (parks) => ({
    type: ActionTypes.ADD_PARKS,
    payload: parks
});

export const fetchParks = () => (dispatch) => {

    dispatch(parksLoading());

    let token = window.localStorage.getItem("authToken")? window.localStorage.getItem("authToken"): "";

    return fetch(baseUrl + 'places/parks', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(parks => dispatch(addParks(parks)))
        .catch(error => dispatch(parksFailed(error.message)));
}