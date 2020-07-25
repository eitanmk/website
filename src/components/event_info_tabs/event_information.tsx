import React from 'react';
import { Header, Card, Image } from 'semantic-ui-react';

import {getIconPath} from '../../utils/assets';

type Content = {
	content_type: string,
};

const contentTypeMap = {
	gather: 'Galaxy',
	shuttles: 'Faction',
	skirmish: 'Skirmish',
	expedition: 'Expedition',
};

function getEventType(contents: Array<Content>) {
	const contentTypes = contents.map(item => contentTypeMap[item.content_type]);
	const items = new Set(contentTypes);
	return [...items].join(' / ');
}

function getRarityStars(rarity: number) {
	const retVal = [];
	for (let i = 0; i < rarity; ++i) {
		retVal.push('\u2605');
	}
	return retVal.join('');
}

function EventInformationTab({eventData}) {
	const {
		name,
		description,
		bonus_text,
		content,
		featured_crew
	} = eventData;

	const crewData = featured_crew.map(crew => ({
		name: crew.full_name,
		image: getIconPath(crew.portrait),
		rarity: crew.rarity,
		skills: Object.keys(crew.skills).map(skill => `${process.env.GATSBY_ASSETS_URL}atlas/icon_${skill}.png`),
		traits: crew.traits.map(trait => `${trait[0].toUpperCase()}${trait.substr(1).replace(/_/g, ' ')}`),
	}));

	return (
		<>
			<Card fluid raised>
				<Card.Content>
					<Card.Header>{name}</Card.Header>
					<Card.Meta>{getEventType(content)}</Card.Meta>
					<Card.Description>{description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<p>{bonus_text}</p>
				</Card.Content>
			</Card>
			<Header as="h3">Featured Crew</Header>
			<Card.Group>
				{crewData.map(crew => (
					<Card>
						<Card.Content>
							<Image floated="left" size="tiny" src={crew.image} />
							<Card.Header>{crew.name}</Card.Header>
							<Card.Meta>
								<p>{getRarityStars(crew.rarity)}</p>
								<p>
									{crew.skills.map(skill => (
										<Image width={30} height={30} inline spaced src={skill} />
									))}
								</p>
							</Card.Meta>
							<Card.Description>
								{crew.traits.join(', ')}
							</Card.Description>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		</>
	);
}

export default EventInformationTab;
