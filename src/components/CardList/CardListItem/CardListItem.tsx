import styled from "styled-components";

const StyledCardListItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-radius: 5px;
  background-color: #d7a461;
`;

const CardListItem = ({
  item,

  selectCard,
}: {
  item: { img: string; clicked: boolean; index: number };

  selectCard: (a: any) => void;
}) => {
  return (
    <StyledCardListItem onClick={() => selectCard(item.index)}>
      <img src={item.img} />
    </StyledCardListItem>
  );
};

export default CardListItem;
