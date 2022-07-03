import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';
import moment from "moment";
import { Router } from 'react-router';


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
