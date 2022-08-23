import { useState } from 'react'


//============  MATH PART (Hesap makinesi mekaniği ve modelini tutan kısım) =========
const opsMeta = ['+', '-', '*', '/'];
const Calculator = () => {
    let result = '';
    
    const sumReducer = (acc, value) => acc + value;
    const subReducer = (acc, value) => acc - value;
    const mulReducer = (acc, value) => acc * value;
    const divReducer = (acc, value) => acc / value;

    const sum = (args) => args.reduce(sumReducer)
    const sub = (args) => args.reduce(subReducer)
    const mul = (args) => args.reduce(mulReducer)
    const div = (args) => args.reduce(divReducer)

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

const opButtonsData = [
    { title: '+', val: '+' },
    { title: '-', val: '-' },
    { title: '*', val: '*' },
    { title: '/', val: '/' },
]

const numButtonsDataGen = (limit) => {
    const numArr = []
    for (let i = 0; i < limit; i++)
        numArr.push({ title: `${i}`, val: i });
    return numArr
}
const numButtonsData10 = numButtonsDataGen(10)

const Button = (props) => {
    return (<button onClick={props.onClickHandler}>{props.title}</button>)
}

const Screen = (props) => {
    const val = props.value === '' ? 0 : props.value;
    return (<div>{val}</div>)
}

const SimpleCalculator = () => {
    const [result, setResult] = useState('');

    const opBtnsDOM = opButtonsData.map(el =>
        <Button key={el.title} title={el.title}
            onClickHandler={() => setResult(calc.push(el.val))} />
    );

    const numBtnsDOM = numButtonsData10.map(el =>
        <Button key={el.title} title={el.title}
            onClickHandler={() => setResult(calc.push(el.val))} />
    );

    return (
        <div className='calcContainer'>
            <Screen value={result} />
            {opBtnsDOM}
            {numBtnsDOM}
            <Button key='Reset' title='Reset' onClickHandler={() => setResult(calc.reset())} />
            <Button key='=' title='=' onClickHandler={() => setResult(calc.calc())} />
        </div>
    )
}







export default SimpleCalculator