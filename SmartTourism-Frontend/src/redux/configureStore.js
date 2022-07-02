import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Events} from './events/events';
import {UserDetails} from './users/UserDetails';
import {Hotels} from './hotels/Hotels';
import {Beaches} from './beaches/Beaches';
import {Parks} from './parks/Parks';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            events: Events,
            userDetails: UserDetails,
            hotels: Hotels,
            beaches: Beaches,
            parks: Parks
        }),
        applyMiddleware(thunk, logger)
    );
}