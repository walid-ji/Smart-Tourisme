import * as ActionTypes from "../ActionTypes";
import {baseUrl} from "../../shared/baseUrl";

export const hotelsLoading = () => ({
    type: ActionTypes.HOTELS_LOADING
});

export const hotelsFailed = (errmess) => ({
    type: ActionTypes.HOTELS_FAILED,
    payload: errmess
});

export const addHotels = (hotels) => ({
    type: ActionTypes.ADD_HOTELS,
    payload: hotels
});

export const fetchHotels = () => (dispatch) => {

    dispatch(hotelsLoading());

    let token = window.localStorage.getItem("authToken")? window.localStorage.getItem("authToken"): "";

    return fetch(baseUrl + 'places/hotels', {
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
        .then(hotels => dispatch(addHotels(hotels)))
        .catch(error => dispatch(hotelsFailed(error.message)));
}
