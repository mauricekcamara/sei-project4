import React, { Reducer } from 'react';

// TODO: move this type somewhere

export const DefaultApplicationState = {
    currentUser: null,
};

export const ApplicationContextReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                currentUser: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                currentUser: null,
            };
    }
};

export const ApplicationContext = React.createContext([
    DefaultApplicationState,
    () => {},
]);
