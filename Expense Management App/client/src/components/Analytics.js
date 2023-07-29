import React from 'react'
import { Progress } from 'antd'
const Analytics = ({ allTransection }) => {
    // Categories
    const categories = ['salary', 'interest', 'bonus', 'pension', 'movie', 'travel', 'bills', 'medical', 'tax', 'other']

    // Total Transactions 
    const totalTransection = allTransection.length
    const totalIncomeTransection = allTransection.filter(transection => transection.type === 'income');
    const totalExpenseTransection = allTransection.filter(transection => transection.type === 'expense');
    const totalIncomePercent = (totalIncomeTransection.length / totalTransection) * 100;
    const totalExpensePercent = (totalExpenseTransection.length / totalTransection) * 100;

    // Total TurnOver
    const totalTurnover = allTransection.reduce((acc, transection) => acc + transection.amount, 0);
    const totalIncomeTurnover = allTransection.filter((transection => transection.type === 'income')).reduce((acc, transection) => acc + transection.amount, 0);
    const totalExpenseTurnover = allTransection.filter((transection => transection.type === 'expense')).reduce((acc, transection) => acc + transection.amount, 0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;
    return (
        <>
            <div className='row m-3'>
                <div className='col-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Transections : <span>{totalTransection}</span>
                        </div>
                        <div className='card-body d-flex flex-column justify-content-center'>
                            <h5 className='text-success'>Income : {totalIncomeTransection.length}</h5>
                            <h5 className='text-danger'>Expense : {totalExpenseTransection.length}</h5>
                            <div className='d-flex flex-column justify-content-center'>
                                <Progress type='circle'
                                    strokeColor={'green'}
                                    className='mx-2 mt-2'
                                    percent={totalIncomePercent.toFixed(2)}
                                />
                                <Progress type='circle'
                                    strokeColor={'red'}
                                    className='mx-2 mt-2'
                                    percent={totalExpensePercent.toFixed(2)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            Total TurnOver : <span>{totalTurnover}₹</span>
                        </div>
                        <div className='card-body d-flex flex-column justify-content-center'>
                            <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                            <div className='d-flex flex-column justify-content-center'>
                                <Progress type='circle'
                                    strokeColor={'green'}
                                    className='mx-2 mt-2'
                                    percent={totalIncomeTurnoverPercent.toFixed(2)}
                                />
                                <Progress type='circle'
                                    strokeColor={'red'}
                                    className='mx-2 mt-2'
                                    percent={totalExpenseTurnoverPercent.toFixed(2)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <h4>Categorywise Income</h4>
                    {
                        categories.map((category, i) => {
                            const amount = allTransection.filter(
                                transection => (transection.type === 'income')
                                    && transection.category === category)
                                .reduce((acc, transection) => acc + transection.amount, 0);
                            return (
                                amount > 0 && (
                                    <div className='card' key={i}>
                                        <div className='card-body' key={i}>
                                            <h5 key={i}>{category}</h5>
                                            <Progress
                                                percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                                                key={i}
                                            />
                                        </div>
                                    </div>
                                )
                            )
                        })
                    }
                </div>
                <div className='col-md-3'>
                    <h4>Categorywise Expense</h4>
                    {
                        categories.map((category, i) => {
                            const amount = allTransection.filter(
                                transection => (transection.type === 'expense')
                                    && transection.category === category)
                                .reduce((acc, transection) => acc + transection.amount, 0);
                            return (
                                amount > 0 && (
                                    <div className='card' key={i}>
                                        <div className='card-body' key={i}>
                                            <h5 key={i}>{category}</h5>
                                            <Progress
                                                percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                                                key={i}
                                            />
                                        </div>
                                    </div>
                                )
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Analytics