// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import { I18n } from 'i18n-js';
import styles from './style.scss';
import translations from '../../lang/translations.json';

const i18n = new I18n(translations);
const clientLocale = navigator.language || 'en';
i18n.locale = clientLocale;

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
  setEditTransaction: Function,
};
const BudgetGridRow = ({ transaction, categories, setEditTransaction }: BudgetGridRowProps) => {
  const amountCls = transaction.value < 0 ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];
  const { i18nDescription, i18nCategory, i18nAmount } = i18n.t('budget_grid_row');
  const { unit, format, separator, delimiter } = i18n.t('currency');

  return (
    <tr key={id} onClick={() => setEditTransaction(id)}>
      <td>
        <div className={styles.cellLabel}>{i18nCategory}</div>
        <div className={styles.cellContent}>{category}</div>
      </td>
      <td>
        <div className={styles.cellLabel}>{i18nDescription}</div>
        <div className={styles.cellContent}>{description}</div>
      </td>
      <td className={amountCls}>
        <div className={styles.cellLabel}>{i18nAmount}</div>
        <div className={styles.cellContent}>
          {i18n.numberToCurrency(transaction.value, { unit, format, separator, delimiter })}
        </div>
      </td>
    </tr>
  );
};

export default BudgetGridRow;
