import React from 'react';
import {Container, Header, Image, Tab } from 'semantic-ui-react';

import LeaderboardTab from './event_info_tabs/leaderboard';

type EventInfoModalProps = {
    instanceId: number,
    eventName: string,
    image: string,
    hasDetails: boolean,
    leaderboard: Array<object>,
}

function EventInfoModal({instanceId, eventName, image, hasDetails, leaderboard}: EventInfoModalProps) {
    const [eventData, setEventData] = React.useState(null);

    React.useEffect(() => {
        async function fetchEventData() {
            if (hasDetails) {
                const fetchResp = await fetch(`/structured/events/${instanceId}.json`);
                const data = await fetchResp.json();
                setEventData(data);
            }
        }

        fetchEventData();
    }, []);

    const panes = [
        {
            menuItem: 'Leaderboard',
            render: () => (
                <Tab.Pane attached={false}>
                    <LeaderboardTab leaderboard={leaderboard} />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <Container style={{ padding: '2em' }}>
            <Header as="h1">{eventName}</Header>
            <Image
                src={`${process.env.GATSBY_ASSETS_URL}${image}`}
                fluid
            />
            <Tab
                style={{marginTop: '1em'}}
                menu={{secondary: true, pointing: true}}
                panes={panes}
            />
        </Container>
    );
}

export default EventInfoModal;
