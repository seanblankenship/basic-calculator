import { useState } from 'react';
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import './App.css'

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

interface Calculator {
  sign: string,
  num: string | number,
  res: string | number,
}


function App() {

  const [calc, setCalc] = useState<Calculator>({
    sign: "",
    num: 0,
    res: 0,
  })

  const numClickHandler = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    const stringify = calc.num.toString();
    if (stringify.length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : Number(calc.num) % 1 === 0
              ? Number(calc.num + value)
              : calc.num + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a: number, b: number, sign: string) =>
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "X"
              ? a * b
              : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === 0 && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? Number(calc.num) * -1 : 0,
      res: calc.res ? Number(calc.res) * -1 : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? Number(calc.num) : 0;
    let res = calc.res ? Number(calc.res) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={
                    btn === "C"
                      ? resetClickHandler
                      : btn === "+-"
                        ? invertClickHandler
                        : btn === "%"
                          ? percentClickHandler
                          : btn === "="
                            ? equalsClickHandler
                            : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                              ? signClickHandler
                              : btn === "."
                                ? commaClickHandler
                                : numClickHandler
                  }
                />
              );
            })
          }

        </ButtonBox>
      </>
    </Wrapper>
  );

};

export default App;