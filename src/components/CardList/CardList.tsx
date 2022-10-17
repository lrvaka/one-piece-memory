import { ReactEventHandler } from "react";
import styled from "styled-components";
import CardListItem from "./CardListItem/CardListItem";

const StlyedCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 800px;
  gap: 1rem;
`;

const CardList = ({
  cardList,
  selectCard,
}: {
  cardList: { img: string; clicked: boolean; index: number }[];
  selectCard: (a: any) => void;
}) => {
  return (
    <StlyedCardList>
      {cardList.map((e, i) => (
        <CardListItem item={e} key={e.img + i} selectCard={selectCard} />
      ))}
    </StlyedCardList>
  );
};

export default CardList;
