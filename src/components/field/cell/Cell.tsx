import React from 'react';
import styled from 'styled-components';
import { CellType } from '../../../types';
import { Flag } from '../flag/Flag';

interface IProps {
  data: CellType;
  checkCell: (cell: CellType) => void;
  setFlag: (x: number, y: number, haveFlag: boolean) => void;
}

interface IWrapper {
  wasCheck: boolean;
  color: string;
}

type ColorsType = {
  [key: number]: string;
}

export const Cell: React.FC<IProps> = ({data, checkCell, setFlag}) => {
  const colors: ColorsType = {
    0: "black",
    1: "darkgreen",
    2: "blue",
    3: "darkred",
    4: "purple",
    5: "darkpurple",
    6: "darkorange",
    7: "darkgrey",
    8: "black"
  }

  const {wasChecked, bombsAround, haveFlag, haveBomb} = data;
  const renderCell = () => {
    if (haveBomb && wasChecked) return "*";
    if (wasChecked) return bombsAround;
    if (haveFlag) return <Flag />;
    else return null;
  }

  return (
    <Wrapper 
      wasCheck={wasChecked}
      color={colors[bombsAround]}
      onClick={() => checkCell(data)}
      onContextMenu={() => setFlag(data.x, data.y, haveFlag)}
    >
      {renderCell()}
    </Wrapper>
  )
}

const Wrapper = styled.div<IWrapper>`
  border: 1px solid black;
  background-color: ${({color, wasCheck}) => wasCheck ? color : "lightgray"};
  color: white;
  cursor: pointer;
  width: 25px;
  height: 25px;
  box-sizing: border-box;
  font-weight: bold;

  :hover {
    background-color: ${({wasCheck}) => !wasCheck && "grey"}
  }
`