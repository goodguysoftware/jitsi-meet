// @flow
import { ReducerRegistry } from '../base/redux';

/**
 * Reduces the Redux actions of the feature features/advertisement.
 */
ReducerRegistry.register('features/advertisement', (state = {}, action) => {
    const { content } = action;

    switch (action.type) {
    case 'SET_ADVERTISEMENT_CONTENT':
        return {
            ...state,
            content
        };
    default:
        return state;
    }
});
