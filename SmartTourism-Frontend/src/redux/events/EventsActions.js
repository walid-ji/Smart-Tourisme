import * as ActionTypes from "./ActionTypes";
import {baseUrl} from "../../shared/baseUrl";

export const addEvent = (event) => ({
    type: ActionTypes.ADD_EVENT,
    payload: event
});

export const postEvent = (name, date, localisation, description, isPrivate,image) => (dispatch) => {

    const newEvent = {
        name: name,
        date: date,
        localisation: localisation,
        description: description,
        isPrivate: isPrivate,
        eventImage : image
    };

    let token = window.localStorage.getItem("authToken")? window.localStorage.getItem("authToken"): "";

    return fetch(baseUrl + 'event', {
        method: "POST",
        body: JSON.stringify(newEvent),
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
                throw error;
            })
        .then(response => response.json())
        .then(event =>  { dispatch(addEvent(event));
            window.location.href="/events_festivaux/"+event.id;
        })
        .catch(error =>  { console.log('post events', error.message); alert('Your event could not be posted\nError: '+error.message); });
};

export const eventsLoading = () => ({
    type: ActionTypes.EVENTS_LOADING
});

export const eventsFailed = (errmess) => ({
    type: ActionTypes.EVENTS_FAILED,
    payload: errmess
});

export const addEvents = (events) => ({
    type: ActionTypes.ADD_EVENTS,
    payload: events
});

export const fetchEvents = () => (dispatch) => {

    dispatch(eventsLoading(true));

    let token = window.localStorage.getItem("authToken")? window.localStorage.getItem("authToken"): "";

    return fetch(baseUrl + 'event', {
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
        .then(events => dispatch(addEvents(events)))
        .catch(error => dispatch(eventsFailed(error.message)));
}

export const showInterest = (eventId, userId, interested) => (dispatch) => {
    let token = window.localStorage.getItem("authToken")? window.localStorage.getItem("authToken"): "";
    let url;
    if(interested)
        url = ":interested";
    else
        url = ":not_interested";

    fetch(baseUrl + 'event/'+eventId+url,{
        method: "PUT",
        body: JSON.stringify(userId),
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
                throw error;
            })
        .then(response => response.json())
        .then(event =>  fetchEvents())
        .catch(error =>  { console.log('put event', error.message); alert('Error: '+error.message); });
}