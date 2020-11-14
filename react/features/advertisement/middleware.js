import { getCurrentConference, getRoomName } from '../base/conference';
import { StateListenerRegistry } from '../base/redux';

StateListenerRegistry.register(
    state => ({
        conference: getCurrentConference(state),
        roomName: getRoomName(state)
    }),
    ({ conference, roomName }, { dispatch }, { conference: prevConference }) => {
        if (conference && conference !== prevConference) {
            fetch(`https://live.streamchatline.com/api/meeting/actioncall?roomName=${roomName}`)
                .then((response) => response.json())
                .then(({ content }) => dispatch({
                    type: 'SET_ADVERTISEMENT_CONTENT',
                    content
                }))
                .catch((error) => {
                    console.error(error);
                    dispatch({
                        type: 'SET_ADVERTISEMENT_CONTENT',
                        content: 'No Advertisement'
                    });
                });
        }
    }
);

import './middleware';