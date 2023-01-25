import { v4 as uuid } from 'uuid';
/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    title: 'Best Goals',
    imageUrl: 'https://i.postimg.cc/x8pDdLWN/goals.jpg',
    description:
      'A goal is scored when the whole of the ball passes over the goal line, between the goalposts and under the crossbar, provided that no offence has been committed by the team scoring the goal.',
  },
  {
    _id: uuid(),
    title: 'Skills',
    imageUrl: 'https://i.postimg.cc/CxYHK9sD/bicycle.jpg',
    description:
      'A football skills are different ways in which a attacker get through defender in order to score a goal.',
  },
  {
    _id: uuid(),
    title: 'Best Freekick',
    imageUrl: 'https://i.postimg.cc/7h9PnCjq/freekick.jpg',
    description:
      'A free kick is a method of restarting play in association football. It is awarded after an infringement of the laws by the opposing team.',
  },
  {
    _id: uuid(),
    title: 'Best Save',
    imageUrl: 'https://i.postimg.cc/wTkRwMDy/best-save.jpg',
    description:
      'A save is awarded to a goalkeeper only if a shot otherwise would have gone into the goal. A goalkeeper can be credited with a save without catching the ball.',
  },
];
