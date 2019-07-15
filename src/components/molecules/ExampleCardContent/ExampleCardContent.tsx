import React, { useState, useCallback } from 'react';
// import { DndContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import TouchBackend from 'react-dnd-touch-backend';
import update from 'immutability-helper';

import Card from '../../atoms/Card/Card';
import { ICard } from '../../../types/card';
import { InitialCards } from '../../../lookups/card';
import { isMobile } from '../../../helpers/agent';
import CustomDragLayer from '../../../containers/CustomDragLayer/CustomDragLayer';

const style = {
  maxWidth: 300,
};

export interface IState {
  cards: ICard[];
}

const ExampleCardContent: React.FC = () => {
  {
    const [cards, setCards] = useState(InitialCards);
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        setCards(
          update(cards, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
          }),
        );
      },
      [cards],
    );

    const renderCard = (card: { id: number; text: string }, index: number) => {
      return <Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />;
    };

    return (
      <React.Fragment>
        {isMobile && <CustomDragLayer />}
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </React.Fragment>
    );
  }
};

// const backEnd = isMobile ? TouchBackend : HTML5Backend;
// const cardContent = DndContext(backEnd)(ExampleCardContent);

export default ExampleCardContent;
