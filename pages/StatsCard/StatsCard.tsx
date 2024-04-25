// Import necessary components and icon library
import { Container, Text } from '@mantine/core';
import classes from './StatsCard.module.css';
import { IconUserBolt } from '@tabler/icons-react';

const data = [
  {
    title: 'Premium Members',
    stats: '100+',
    icon: 'premiumIcon', // Replace with your icon identifier
  },
  {
    title: 'Qualified Trainers',
    stats: '15+',
    icon: 'trainerIcon', // Replace with your icon identifier
  },
  {
    title: 'Badminton Courts',
    stats: '14',
    icon: 'courtsIcon', // Replace with your icon identifier
  },
];

// Define your icon components or import from an icon library
const iconComponents = {
  premiumIcon: () => <IconUserBolt />,
  trainerIcon: () => <IconUserBolt />,
  courtsIcon: () => <IconUserBolt />,
  // Add more icons as needed
};

export default function StatsCard() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      {/* {iconComponents[stat.icon] && iconComponents[stat.icon]()} */}
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
    </div>
  ));

  return <Container size="lg" mt={70}> <div className={classes.root}>{stats}</div></Container>;
}
