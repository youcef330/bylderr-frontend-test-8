import formatToUSD from '../../../utils/formatToUSD';

/**
 * DividendInfo Component
 *
 * A React component that displays detailed dividend information, including income, expenses, net income,
 * and dividend per share. The component dynamically calculates totals and renders them in a structured table.
 *
 */
const DividendInfo = ({ financialDetails }) => {
    if (!financialDetails) return null;

    const { details, income, expenses } = financialDetails;
    const { month, shares } = details;

    /**
     * Calculates the total amount for an array of items.
     *
     * @param {Array<Object>} items - The items to calculate the total for.
     * @returns {number} The total amount.
     */
    const calculateTotal = (items) => items.reduce((sum, item) => sum + item.amount, 0);

    const totalIncome = calculateTotal(income);
    const totalExpenses = calculateTotal(expenses);
    const netIncome = totalIncome - totalExpenses;

    /**
     * Renders table rows for income or expense items.
     *
     * @param {Array<Object>} items - The items to render.
     * @param {boolean} [isExpense=false] - Whether the items are expenses (affects styling).
     * @returns {React.Element[]} An array of rendered table rows.
     */
    const renderTableRows = (items, isExpense = false) => {
        return items.map((item, index) => (
            <tr
                key={index}
                className={`${isExpense ? 'hover:bg-red-100 dark:hover:bg-red-950' : 'hover:bg-green-100 dark:hover:bg-emerald-950'}`}
            >
                <td className="py-3 px-6 text-left capitalize border-gray-300 dark:border-dark-border">
                    {item.name}
                </td>
                <td className="py-3 px-6 text-right border-gray-300 dark:border-dark-border">
                    {formatToUSD(isExpense ? -item.amount : item.amount)}
                </td>
            </tr>
        ));
    };

    return (
        <div className="py-5 border-t border-b border-gray-500 mt-10 dark:border-dark-border">
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white dark:bg-dark-bg border-gray-300 dark:border-dark-border rounded-2xl overflow-hidden">
                    <tbody className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                        <tr>
                            <td
                                colSpan="2"
                                className="py-3 px-6 text-xl font-bold text-gray-100 bg-gray-200 dark:bg-dark-sideBg border-t border-b border-gray-300 dark:border-dark-border"
                            >
                                <span className="flex justify-between text-gray-500 dark:text-gray-100">
                                    {month} Dividend:{" "}
                                    <span className="text-md text-midnight-blue">
                                        {formatToUSD(netIncome / shares)} / Share
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan="2"
                                className="py-3 px-6 font-bold text-lg text-green-700 dark:text-gray-100 bg-gray-50 dark:bg-dark-sideBg border-t border-b border-gray-300 dark:border-dark-border"
                            >
                                Income
                            </td>
                        </tr>
                        {renderTableRows(income)}
                        <tr className="font-bold border-t border-b border-gray-300 text-lg dark:border-dark-border hover:bg-green-100 dark:hover:bg-emerald-950">
                            <td className="py-3 px-6 text-left">Total Income</td>
                            <td className="py-3 px-6 text-right">{formatToUSD(totalIncome)}</td>
                        </tr>
                        <tr>
                            <td
                                colSpan="2"
                                className="py-3 px-6 font-bold text-lg text-red-900 dark:text-gray-100 bg-gray-50 dark:bg-dark-sideBg border-t border-b border-gray-300 dark:border-dark-border"
                            >
                                Expenses
                            </td>
                        </tr>
                        {renderTableRows(expenses, true)}
                        <tr className="font-bold border-t border-b border-gray-300 text-lg dark:border-dark-border hover:bg-red-100 dark:hover:bg-red-950">
                            <td className="py-3 px-6 text-left">Total Expenses</td>
                            <td className="py-3 px-6 text-right">{formatToUSD(-totalExpenses)}</td>
                        </tr>
                        <tr className="font-bold bg-gray-300 dark:bg-dark-sideBg text-lg border-t border-b border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-cardBg">
                            <td className="py-3 px-6 text-left">Net Income</td>
                            <td className="py-3 px-6 text-right">{formatToUSD(netIncome)}</td>
                        </tr>
                        <tr className="font-bold bg-gray-100 dark:bg-dark-bg border-t border-b border-gray-300 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-cardBg">
                            <td className="py-3 px-6 text-left">Shares Issued</td>
                            <td className="py-3 px-6 text-right">{shares}</td>
                        </tr>
                        <tr className="font-bold bg-gray-200 dark:bg-dark-sideBg border-t text-lg border-b border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-cardBg">
                            <td className="py-3 px-6 text-left">Dividend per Share</td>
                            <td className="py-3 px-6 text-right">{formatToUSD(netIncome / shares)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DividendInfo;