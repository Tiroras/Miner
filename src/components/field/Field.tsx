import React from 'react';
import { CellType } from '../../types';
import { Cell } from './cell';
import styled from "styled-components";

interface IProps {
  cells: CellType[];
  n: number;
  m: number;
  checkCell: (cell: CellType) => void;
  setFlag: (x: number, y: number, haveFlag: boolean) => void;
}

interface IWrapper {
  n: number;
  m: number;
}

export const Field: React.FC<IProps> = ({cells, n, m, checkCell, setFlag}) => {
  return (
    <Wrapper n={n} m={m}>
      {cells.map((c) => (
        <Cell key={c.id} data={c} checkCell={checkCell} setFlag={setFlag} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div<IWrapper>`
  width: ${({n}) => 25 * n + 1}px;
  height: ${({m}) => 25 * m}px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`