import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import moment from "moment";
import { Router } from 'react-router';

export const addEvent = (event) => ({
    type: ActionTypes.ADD_EVENT,
    payload: event
  });
  
export const postEvent = (name, date, localisation, description, isPrivate) => (dispatch) => {
  
    const newEvent = {
        name: name,
        date: date,
        localisation: localisation,
        description: description,
        isPrivate: isPrivate
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

/**************************************************************/
export const signup = (type, username, password, name, description, activityField, birthday, city, country, languages, gender) => (dispatch) => {

    var user = {type: type, email: username, password: password, name: name};
    if(type === "Visitor"){
      user.gender = gender;
      user.residence = city + ", " + country;
      user.age = moment().diff(birthday, 'year');
      user.spokenLanguages = languages.split(" ");
    }
    else if(type === "Sector"){
      user.activityField = activityField;
      user.description = description;
    }
    
    return fetch(baseUrl + 'users/register', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
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
          alert(error);
          throw error;
        }
      },
      error => {
            alert(error);
            throw error;
      })
    .then(response => response.json())
    .then(createdUser =>  {
      alert("Votre compte a été créé avec succès\nEssayez de vous connecter maintenant!"); 
      window.location.href = "/";
    })
    .catch(error =>  {
      console.log('signup', error.message);
      alert("Votre Compte n'a pas pu être créé. \n " + error.message);
    });
  };

  export const login = (username, password, rememberMe) => (dispatch) => {

    var credentials = {email: username, password: password};

    return fetch(baseUrl + 'users/login', {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
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
    .then(authResponse => {
      dispatch(loginSuccess(authResponse, rememberMe));
    })
    .catch(error =>  {
      console.log('login', error.message);
      alert("Vérifiez votre login et/ou mot de passe");
      dispatch(loginFailed(error.message))
    });
  };

  export const logout = () => ({
    type: ActionTypes.LOGOUT
  });

  export const loginSuccess = (authResponse, rememberMe) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {
      authToken: authResponse.token,
      user: authResponse.user,
      rememberMe: rememberMe
    }
  });

   export const loginFailed = (errMess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errMess
  });


  export const SignUpSuccess = () => ({ type: ActionTypes.ACC_CREATED });

/**************************************************************/
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

/**************************************************************/
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

/**************************************************************/
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