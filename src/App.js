import React, { useState } from 'react';
import { isInputNumber, isOperation } from './utility';

import Button from './components/Button';

const App = () => {
  const btnValues = [
    { name: 'escape', value: 'C', className: 'col-span-2 bg-red-900' },
    { name: 'divide', value: '/', className: 'bg-shark-1' },
    { name: 'multiply', value: '*', className: 'bg-shark-1' },
    { name: 'seven', value: '7', className: 'bg-shark-2' },
    { name: 'eight', value: '8', className: 'bg-shark-2 ' },
    { name: 'nine', value: '9', className: 'bg-shark-2' },
    { name: 'minus', value: '-', className: 'bg-shark-1' },
    { name: 'four', value: '4', className: 'bg-shark-2' },
    { name: 'five', value: '5', className: 'bg-shark-2' },
    { name: 'six', value: '6', className: 'bg-shark-2' },
    { name: 'plus', value: '+', className: 'bg-shark-1' },
    { name: 'one', value: '1', className: 'bg-shark-2' },
    { name: 'two', value: '2', className: 'bg-shark-2' },
    { name: 'three', value: '3', className: 'bg-shark-2' },
    { name: 'equals', value: '=', className: 'row-span-2 bg-shark-1' },
    { name: 'zero', value: '0', className: 'bg-shark-2' },
    { name: 'point', value: '.', className: 'bg-shark-2' },
  ];

  const [lastInput, setLastInput] = useState({
    display: '',
    number: 0,
    operation: '',
    isDotAlreadyInputted: false,
  });

  const processInput = (value = '') => {
    // 1. Check if input is a number
    if (isInputNumber(value)) {
      // numberHandler(btn.value);
      setLastInput({
        ...lastInput,
        number: Number(value),
        display: lastInput.display + value,
        operation: '',
      });
      // 2. Check if input is an operation
    } else if (isOperation(value)) {
      // 2.1 Check if operation is already inputted
      // 2.1 Check if there is already a number inputted
      if (lastInput.operation === '' && lastInput.display !== '') {
        setLastInput({
          ...lastInput,
          operation: value,
          display: lastInput.display + `[${value}]`,
          isDotAlreadyInputted: false,
        });
      }
      // 3. Check if input is dot (decimal)
    } else if (value === '.') {
      if (!lastInput.isDotAlreadyInputted) {
        setLastInput({
          ...lastInput,
          number: parseFloat(`${lastInput.display}.`),
          display: lastInput.display + value,
          operation: '',
          isDotAlreadyInputted: true,
        });
      }
      // 4. Check if input is equals
    } else if (value === '=' || value === 'Enter') {
      let display = lastInput.display.replace(/[[\]]/g, ' ');
      let valArr = display.split(/\s[+-/*]\s/), //split string on each operator (having a space either side allowing for a negative value)
        opArr = display.match(/\s[+-/*]\s/g); //return all operators from string

      for (let i = 0; i < valArr.length; i++) {
        //convert each value to a number instead of string
        valArr[i] = +valArr[i];
      }

      for (let j = 0; j < opArr.length; j++) {
        //cleanup whitespace from operators
        opArr[j] = opArr[j].trim();
      }

      let currentTotal = valArr[0];
      for (let i = 0, len = opArr.length; i < len; i++) {
        switch (opArr[i]) {
          case '+':
            currentTotal = currentTotal + valArr[i + 1];
            break;
          case '-':
            currentTotal = currentTotal - valArr[i + 1];
            break;
          case '*':
            currentTotal = currentTotal * valArr[i + 1];
            break;
          case '/':
            currentTotal = currentTotal / valArr[i + 1];
            break;
          default:
            break;
        }
      }

      setLastInput({
        display: currentTotal.toString(),
        number: 0,
        operation: '',
      });
      // 5. Check if input is escape
    } else if (value === 'C' || value === 'Escape') {
      setLastInput({
        display: '',
        number: 0,
        operation: '',
      });
    }
  };

  const randomizeNumberBtn = () => {
    let currentIndex = btnValues.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      if (
        isInputNumber(btnValues[currentIndex].value) &&
        isInputNumber(btnValues[randomIndex].value)
      ) {
        // And swap it with the current element.
        [btnValues[currentIndex], btnValues[randomIndex]] = [
          btnValues[randomIndex],
          btnValues[currentIndex],
        ];
      }
    }

    btnValues[15].className += ' col-span-2';
  };

  randomizeNumberBtn();

  return (
    <div
      className="grid grid-cols-4 justify-center h-screen gap-1"
      onKeyDown={event => {
        processInput(event.key);
      }}
    >
      <input
        name="display"
        type="text"
        className={`col-span-4 text-right px-8 text-4xl font-bold text-white bg-bright-gray rounded-lg ${
          lastInput.display === '' ? 'text-opacity-50' : ''
        }`}
        value={lastInput.display.replace(/[[\]]/g, ' ') || '0'}
        onChange={e =>
          setLastInput({
            ...lastInput,
            display: e.target.value,
          })
        }
      />

      {btnValues.map(btn => (
        <Button
          key={btn.name}
          {...btn}
          onClick={() => {
            processInput(btn.value);
          }}
        />
      ))}
    </div>
  );
};

export default App;
