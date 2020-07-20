import React from 'react';
import { Message, Table } from 'semantic-ui-react';

function LeaderboardTab({leaderboard}) {
    return (
        <>
            <Message>
                If this event is currently active, the leaderboard below might be out of date. (Data is updated only a couple of times a week)
            </Message>
            <Table celled selectable striped collapsing unstackable compact='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>Rank</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Score</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {leaderboard.map(member => (
                        <Table.Row key={member.dbid}>
                            <Table.Cell>{member.rank}</Table.Cell>
                            <Table.Cell>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '60px auto',
                                        gridTemplateAreas: `'icon stats' 'icon description'`,
                                        gridGap: '1px'
                                    }}>
                                    <div style={{ gridArea: 'icon' }}>
                                        <img
                                            width={48}
                                            src={`${process.env.GATSBY_ASSETS_URL}${member.avatar ? member.avatar.file.substr(1).replace(/\//g, '_') + '.png' : 'crew_portraits_cm_empty_sm.png'}`}
                                        />
                                    </div>
                                    <div style={{ gridArea: 'stats' }}>
                                        <span style={{ fontWeight: 'bolder', fontSize: '1.25em' }}>
                                            {member.display_name}
                                        </span>
                                    </div>
                                    <div style={{ gridArea: 'description' }}>
                                        Level {member.level}
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>{member.score}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}

export default LeaderboardTab;
