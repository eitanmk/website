import React from 'react';
import { Container, Header, Message, Card, Segment, Label, Grid } from 'semantic-ui-react';
import { navigate, Link } from 'gatsby';

import Layout from '../components/layout';
import LazyImage from '../components/lazyimage';

function getEventCard(eventInfo) {
    return (
        <Segment padded>
            <Label attached="bottom">
                {eventInfo.event_name}
            </Label>
            <LazyImage 
                src={`${process.env.GATSBY_ASSETS_URL}${eventInfo.image}`}
                size="large"
                onError={e => e.target.style.visibility = 'hidden'}
            />
        </Segment>
    );
}

function EventsPage() {
    const [eventsData, setEventsData] = React.useState([]);
    const [loadingError, setLoadingError] = React.useState(null);

    // load the events data once on component mount
    React.useEffect(() => {
        async function loadEventsData() {
            try {
                const fetchResp = await fetch('/structured/event_instances.json')
                const data = await fetchResp.json();
                setEventsData(data.reverse());
            }
            catch (e) {
                setLoadingError(e);
            }
        }

        loadEventsData();
    }, []);

    return (
        <Layout>
		    <Container style={{ paddingTop: '4em', paddingBottom: '2em' }}>
                <Header as='h2'>Events</Header>
                {loadingError && (
                    <Message negative>
                        <Message.Header>Unable to load event information</Message.Header>
                        <pre>{loadingError.toString()}</pre>
                    </Message>
                )}
                <Grid columns={3}>
                    {eventsData.map(eventInfo => (
                        <Grid.Column key={eventInfo.instance_id}>
                            {eventInfo.event_details ?
                                <Link to={`/event_info?instance_id=${eventInfo.instance_id}`}>
                                    {getEventCard(eventInfo)}
                                </Link>
                                : getEventCard(eventInfo)
                            }
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </Layout>
    );
}

export default EventsPage;
