import { useState } from 'react'
import './style.css'


//============  MATH PART (Hesap makinesi mekaniği ve modelini tutan kısım) =========
const opsMeta = ['+', '-', '*', '/', '+/-', '%'];
const Calculator = () => {
    let result = '';

    const sumReducer = (acc, value) => acc + value;
    const subReducer = (acc, value) => acc - value;
    const mulReducer = (acc, value) => acc * value;
    const divReducer = (acc, value) => acc / value;
    const modReducer = (acc, value) => acc % value;

    const sum = (args) => args.reduce(sumReducer)
    const sub = (args) => args.reduce(subReducer)
    const mul = (args) => args.reduce(mulReducer)
    const div = (args) => args.reduce(divReducer)
    const mod = (args) => args.reduce(modReducer)

    const reset = () => {
        result = '';
        return result
    }
    const isOpExist = () => {
        let flag = false;
        opsMeta.forEach(el => {
            if (result.includes(el)) flag = el;
        });
        return flag;
    }
    //When User Clicks Numbers/Functions
    const push = (val) => {
        const op = isOpExist();
        if (op && opsMeta.includes(val)) {
            result = doCalculation(op);
        }
        result += val;
        return result;
    }

    const doCalculation = (op) => {
        if (op) {
            const arr = result.split(op);
            const arrInt = arr.map(el => parseInt(el));
            switch (op) {
                case '+':
                    return sum(arrInt) + '';
                case '-':
                    return sub(arrInt) + '';
                case '*':
                    return mul(arrInt) + '';
                case '/':
                    return div(arrInt) + '';
                case '+/-':
                    return sum(arrInt) + '';
                case '%':
                    return mod(arrInt) + '';
                default:
                    return '';
            }
        }


    }

    //When User Clicks =
    const calc = () => {
        const op = isOpExist()
        result = doCalculation(op)
        return result
    }

    return { push: push, reset: reset, calc: calc }


}
const calc = Calculator();

//==== DATA PART ====
const opButtonsData = [
    { title: '+', val: '+' },
    { title: '-', val: '-' },
    { title: '*', val: '*' },
    { title: '/', val: '/' },
    { title: '%', val: '%' },
    { title: '+/-', val: '+/-' },
]

const numButtonsDataGen = (limit) => {
    const numArr = []
    for (let i = 0; i < limit; i++)
        numArr.push({ title: `${i}`, val: `${i}` });
    return numArr
}
const numButtonsData10 = numButtonsDataGen(10)

//=====COMPONENTS PART ========
const Button = (props) => {
    const className = (props.className) ? `btn ${props.className}` : 'btn'
    return (<button className={className} onClick={props.onClickHandler}>{props.title}</button>)
}

const Screen = (props) => {
   // const val = props.value === '' ? 0 : props.value;
   const val = props?.value; //similar
    return (
        <>
        <div className = 'resize-btn-part'></div>
        <div className = 'screen-part'>{val}</div>
        </>
    )
}

const SimpleCalculator = () => {
    
    const [result, setResult] = useState('');

    const opBtnsDOM = opButtonsData.map(el =>
        <Button key={el.title} title={el.title}
        className = {'op'}
            onClickHandler={() => setResult(calc.push(el.val))} />
    );

    const numBtnsDOM = numButtonsData10.map(el =>
        <Button key={el.title} title={el.title}
        className = {'num'}
            onClickHandler={() => setResult(calc.push(el.val))} />
    );

    const btnCurrency = <Button className = {'num'} key = ',' title = ',' />;

    const btnCalc = <Button className = {'op'} key = '=' title = '=' onClickHandler = {() =>setResult(calc.calc())} />;
    const btnAc = <Button className = {'oth'} key = 'AC' title = 'AC' onClickHandler = {() =>setResult(calc.reset())} />;
    const btnSignChange = <Button className = {'oth'} key = '+/-' title = '+/-' />
    const btnRatio = <Button className = {'oth'} key = '%' title = '%' />

    return (
        <div className='calc-layout-container'>
            <div class = "screen-layout-container">
            <Screen value={result} />
            </div>
            <div className='button-layout-container'>
                <table border= "0" cellspacing = "0" cellpadding = "1">
                  <tr>
                    <td>{btnAc}</td>
                    <td>{btnSignChange}</td>
                    <td>{btnRatio}</td>
                    <td>{opBtnsDOM[3]}</td>
                  </tr>
                  <tr>
                    <td>{numBtnsDOM[7]}</td>
                    <td>{numBtnsDOM[8]}</td>
                    <td>{numBtnsDOM[9]}</td>
                    <td>{opBtnsDOM[2]}</td>
                  </tr>
                  <tr>
                    <td>{numBtnsDOM[4]}</td>
                    <td>{numBtnsDOM[5]}</td>
                    <td>{numBtnsDOM[6]}</td>
                    <td>{opBtnsDOM[1]}</td>
                  </tr>
                  <tr>
                    <td>{numBtnsDOM[1]}</td>
                    <td>{numBtnsDOM[2]}</td>
                    <td>{numBtnsDOM[3]}</td>
                    <td>{opBtnsDOM[0]}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>{numBtnsDOM[0]}</td>
                    <td>{btnCurrency}</td>
                    <td>{btnCalc}</td>
                  </tr>
                </table>
            </div>

            {/* <Button key='Reset' title='Reset' onClickHandler={() => setResult(calc.reset())} />
            <Button key='=' title='=' onClickHandler={() => setResult(calc.calc())} /> */}
        </div>
    )
}







export default SimpleCalculator