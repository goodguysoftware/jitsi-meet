import { getCurrentConference, getRoomName } from '../base/conference';
import { participantJoined } from '../base/participants';
import { StateListenerRegistry } from '../base/redux';

StateListenerRegistry.register(
    state => ({
        conference: getCurrentConference(state),
        roomName: getRoomName(state)
    }),
    ({ conference, roomName }, { dispatch }, { conference: prevConference }) => {
        if (conference && conference !== prevConference) {
            dispatch(participantJoined({
                conference,
                id: `https://live.streamchatline.com/embedded/${roomName}`,
                isFakeParticipant: true,
                avatarURL: `https://live.streamchatline.com/thumb?roomName=${roomName}`,
                name: 'Live Stream',
                pinned: true
            }));
        }
    }
);

import './middleware';