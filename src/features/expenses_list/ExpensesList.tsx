import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    addExpense, removeExpense, selectExpenses
} from './expensesSlice';
import styles from './Counter.module.css';

export function ExpensesList() {
  const expenses = useAppSelector(selectExpenses);
  const dispatch = useAppDispatch();

  return (
    <div className='bg-amber-500 w-full h-full'>
      <p>Welcome !</p>
    </div>
  );
}
