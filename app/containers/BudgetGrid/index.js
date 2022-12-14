// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import EntryFormRow from 'containers/EntryFormRow';
import type { Transaction } from 'modules/transactions';
import BudgetGridRow from 'components/BudgetGridRow';
import { I18n } from 'i18n-js';
import styles from './style.scss';
import translations from '../../lang/translations.json';

const i18n = new I18n(translations);
const clientLocale = navigator.language || 'en';
i18n.locale = clientLocale;

type BudgetGridProps = {
  transactions: Transaction[],
  categories: Object,
};

export class BudgetGrid extends React.Component<BudgetGridProps> {
  state = {
    editTransactionId: '',
  };

  editTransaction = (id: String) => {
    this.setState({ editTransactionId: id });
  };

  getRowContent = (transaction, categories) =>
    transaction.id === this.state.editTransactionId ? (
      <EntryFormRow
        key={transaction.id}
        transaction={transaction}
        categories={categories}
        setEditTransaction={this.editTransaction}
      />
    ) : (
      <BudgetGridRow
        key={transaction.id}
        transaction={transaction}
        categories={categories}
        setEditTransaction={this.editTransaction}
      />
    );

  render() {
    const { transactions, categories } = this.props;
    const { description, category, amount } = i18n.t('budget_grid_table');

    return (
      <table className={styles.budgetGrid}>
        <thead>
          <tr>
            <th>{description}</th>
            <th>{category}</th>
            <th>{amount}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            (transaction: Transaction): React.Element<any> => this.getRowContent(transaction, categories)
          )}
        </tbody>
        <tfoot>
          <EntryFormRow />
        </tfoot>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default connect(mapStateToProps)(BudgetGrid);
