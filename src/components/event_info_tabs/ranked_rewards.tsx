import React from 'react';
import { Table, Image, Label } from 'semantic-ui-react';

import { getIconPath, getRarityColor } from '../../utils/assets';

function getBracketLabel(bracket) {
	if (bracket.last === 1) { // top rank is special
		return bracket.first;
	}
	if (bracket.last === -1) { // last rank is any score above
		return `${bracket.first} and above`
	}

	return `${bracket.first} - ${bracket.last}`;
}

function RankedRewardsTab({eventData}) {
	const {ranked_brackets} = eventData;

	return (
		<Table celled striped compact='very'>
			<Table.Body>
				{ranked_brackets.map(row => (
					<Table.Row key={row.points}>
						<Table.Cell width={2}>{getBracketLabel(row)}</Table.Cell>
						<Table.Cell width={14}>
							{row.rewards.map(reward => (
								<Label color="black">
									<Image
										src={getIconPath(reward.icon)}
										size="small"
										inline
										spaced="right"
										bordered
										style={{
											borderColor: getRarityColor(reward.rarity),
											maxWidth: '27px',
											maxHeight: '27px'
										}}
										alt={reward.full_name}
									/>
									{reward.full_name}
									{reward.quantity > 1 ? ` x ${reward.quantity}` : ''}
								</Label>
							))}
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);}

export default RankedRewardsTab;
