import {baseUrl} from "../../shared/baseUrl";
import * as ActionTypes from "../ActionTypes";

export const beachesLoading = () => ({
    type: ActionTypes.BEACHES_LOADING
});

export const beachesFailed = (errmess) => ({
    type: ActionTypes.BEACHES_FAILED,
    payload: errmess
});

export const addBeaches = (beaches) => ({
    type: ActionTypes.ADD_BEACHES,
    payload: beaches
});

export const fetchBeaches = () => (dispatch) => {

    dispatch(beachesLoading());

    let token = window.localStorage.getItem("authToken")? window.localStorage.getItem("authToken"): "";

    return fetch(baseUrl + 'places/beaches', {
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
    .then(beaches => dispatch(addBeaches(beaches)))
    .catch(error => dispatch(beachesFailed(error.message)));
}
