import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(false);

  const handleNumber = (num) => {
    if (display === '0' || newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op) => {
    if (operation && !newNumber) {
      calculate();
    }
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operation === null || newNumber) return;

    const second = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = firstNumber + second;
        break;
      case '-':
        result = firstNumber - second;
        break;
      case '×':
        result = firstNumber * second;
        break;
      case '÷':
        result = firstNumber / second;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setFirstNumber(result);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(false);
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay((current / 100).toString());
  };

  const handlePlusMinus = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ label, onClick, className }) => (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-full text-2xl font-light focus:outline-none active:opacity-75 ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="w-72 bg-black rounded-3xl overflow-hidden">
        <div className="h-24 flex items-end justify-end px-6 pb-4">
          <span className="text-white text-6xl font-light">{display}</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2 p-2">
          <Button
            label="AC"
            onClick={handleClear}
            className="bg-gray-300 text-black"
          />
          <Button
            label="±"
            onClick={handlePlusMinus}
            className="bg-gray-300 text-black"
          />
          <Button
            label="%"
            onClick={handlePercent}
            className="bg-gray-300 text-black"
          />
          <Button
            label="÷"
            onClick={() => handleOperation('÷')}
            className="bg-orange-500 text-white"
          />
          
          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              label={num}
              onClick={() => handleNumber(num)}
              className="bg-gray-700 text-white"
            />
          ))}
          <Button
            label="×"
            onClick={() => handleOperation('×')}
            className="bg-orange-500 text-white"
          />
          
          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              label={num}
              onClick={() => handleNumber(num)}
              className="bg-gray-700 text-white"
            />
          ))}
          <Button
            label="-"
            onClick={() => handleOperation('-')}
            className="bg-orange-500 text-white"
          />
          
          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              label={num}
              onClick={() => handleNumber(num)}
              className="bg-gray-700 text-white"
            />
          ))}
          <Button
            label="+"
            onClick={() => handleOperation('+')}
            className="bg-orange-500 text-white"
          />
          
          <Button
            label="0"
            onClick={() => handleNumber(0)}
            className="col-span-2 w-full bg-gray-700 text-white"
          />
          <Button
            label="."
            onClick={handleDecimal}
            className="bg-gray-700 text-white"
          />
          <Button
            label="="
            onClick={calculate}
            className="bg-orange-500 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;