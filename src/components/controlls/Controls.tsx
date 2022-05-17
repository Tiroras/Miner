import React from 'react';
import styled from 'styled-components';

interface IProps {
  startGame: () => void;
}

export const Controls: React.FC<IProps> = ({startGame}) => {
  return (
    <Wrapper>
      <Button onClick={startGame}>Заново</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 15px 0;
`

const Button = styled.button`
  background-color: black;
  border: none;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
`