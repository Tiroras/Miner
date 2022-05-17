import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { Controls } from './components/controlls';
import { Field } from './components/field/Field';
import { CellType } from './types';

function App() {
  const [cells, setCells] = useState<CellType[]>([])
  const [youLost, setYouLost] = useState(false);
  const [youWin, setWin] = useState(false);
  const [bombMarked, setBombMarked] = useState(0);
  const [cellsChecked, setCellsChecked] = useState(0);

  const n = 18;
  const m = 14;
  const b = 63;

  const startGame = () => {
    setYouLost(false);
    setWin(false);
    setBombMarked(0);
    setCellsChecked(0)

    const generatedCells: CellType[] = [];
    let x = 0;
    let y = 0;

    for (let i = 0; i < n * m; i++) {     
      generatedCells.push({
        id: i,
        x, 
        y, 
        haveBomb: false, 
        haveFlag: false, 
        bombsAround: 0,
        wasChecked: false,
      })    
      
      x++;
      if (x % n === 0) {
        x = 0
        y++;
      }
    }

    const indexes: number[] = [];
    for (let i = 0; i < b; i++) {
      indexes.push(Math.floor(Math.random() * generatedCells.length))
    }
    indexes.forEach(i => {
      generatedCells[i].haveBomb = true;
    })

    generatedCells.forEach((cell, i) => {
      if (cell.haveBomb) {
        if (generatedCells[i].x !== 0 && i - 1 >= 0) generatedCells[i-1].bombsAround++;
        if (generatedCells[i].x !== (n - 1) && i + 1 < generatedCells.length) generatedCells[i+1].bombsAround++;

        if (generatedCells[i].y !== 0) {
          generatedCells[i].x !== 0 && i - (n + 1) >= 0 && generatedCells[i-(n+1)].bombsAround++;
          (i - n) >= 0 && generatedCells[i-n].bombsAround++;
          generatedCells[i].x !== (n - 1) && i - (n - 1) >= 0 && generatedCells[i-(n-1)].bombsAround++;  
        }

        if (generatedCells[i].y !== (m - 1)) {
          generatedCells[i].x !== 0 && i + (n - 1) < generatedCells.length && generatedCells[i+(n-1)].bombsAround++;
          i + n < generatedCells.length && generatedCells[i+n].bombsAround++;
          generatedCells[i].x !== (n - 1) && i + (n + 1) < generatedCells.length && generatedCells[i+(n+1)].bombsAround++;
        }
      }
    })

    setCells(generatedCells);
  }

  const check = (cells: CellType[], ind: number) => {
    if (!cells[ind].wasChecked) {
      cells[ind].wasChecked = true;
      setCellsChecked((c) => c+1);

      const rightCond = cells[ind].x !== (n - 1) && ind + 1 < cells.length
      const leftCond = cells[ind].x !== 0 && ind - 1 >= 0 && ind-1;
      const downCond = cells[ind].y !== (m - 1) && (ind + n) < cells.length;
      const upCond = cells[ind].y !== 0 && (ind - n) >= 0;

      const leftDownCond = cells[ind].x !== (n - 1) && ind - (n - 1) >= 0 && cells[ind].y !== 0;
      const rightDownCond = cells[ind].x !== 0 && ind - (n + 1) >= 0&& cells[ind].y !== 0;
      const leftUpCond = cells[ind].x !== 0 && ind + (n - 1) < cells.length && cells[ind].y !== (m - 1);
      const rightUpCond = cells[ind].x !== (n - 1) && ind + (n + 1) < cells.length && cells[ind].y !== (m - 1);

      if (cells[ind].bombsAround === 0) {
        rightCond && check(cells, ind+1);
        leftCond && check(cells, ind-1);
        downCond && check(cells, ind+n);
        upCond && check(cells, ind-n);

        leftDownCond && check(cells, ind-(n-1));
        rightDownCond && check(cells, ind-(n+1));
        leftUpCond && check(cells, ind+(n-1));
        rightUpCond && check(cells, ind+(n+1));
      }
    }
  }

  const checkCell = (cell: CellType) => {
    if(!cell.haveFlag && (!youLost || !youWin)) {
      if (!cell.wasChecked && !cell.haveBomb) {
        const arr = [...cells];
        check(arr, cell.id);
        setCells(arr);
      }
  
      if (cell.haveBomb) setYouLost(true);
    }
  }

  const setFlag = (x: number, y: number, haveFlag: boolean) => {
    if (!youLost || !youWin) {
      const newCells = cells.map(c => {
        if (c.x === x && c.y === y) {
          c.haveFlag = !c.haveFlag;
          if (c.haveBomb){
            c.haveFlag ? setBombMarked(bombMarked+1) : setBombMarked(bombMarked-1);
          }
        } 
        return c;
      })
  
      setCells(newCells);
    }
    
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (youLost) {
      const newCells = cells.map(c => {
        if (c.haveBomb) c.wasChecked = true;
        return c;
      })

      setCells(newCells);
    }
  }, [youLost])

  useEffect(() => {
    bombMarked === b && cellsChecked === cells.length - b && setWin(true);
  }, [bombMarked, cellsChecked])

  return (
    <div className="App">
      <Controls startGame={startGame} />
      <Message>
        {youLost && "Ты проиграл"}
        {youWin && "Победа!"}
      </Message>
      <Field cells={cells} n={n} m={m} checkCell={checkCell} setFlag={setFlag} />
    </div>
  );
}

export default App;


const Message = styled.div`
  height: 20px;
`
