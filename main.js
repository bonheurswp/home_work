/**
* A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
* 
* A customer receives 2 points for every dollar spent over $100 in each transaction, 
* plus 1 point for every dollar spent over $50 in each transaction
* (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
* 
* but I think its should be:
* (e.g. a $120 purchase = 2x$20 + 1x$70 = 110 points).
*  
* Given a record of every transaction during a three month period,
* calculate the reward points earned for each customer per month and total. 

* @param {array} transactions, transaction list. each transaction is an object
* e.g. {transactionId: 000001, customerId: 567890, transactionTimeStamp: 628021800000, purchaseAmount: 120.5}

* @return {map} customer's points map,
* e.g. {567890: {totalPoints: 1000, pointsPerMonth: {'JAN': 300, 'FEB':300, 'MAR':400...}}... }
*/
const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function calculateRewardPoints(transactions) {
    let customerPointsMap = new Map();

    // check if transactions is an array
    if (!Array.isArray(transactions)) {
         return 'transactions should be an array';
    }

    transactions.forEach((transaction) => {
        const transactionPoints = transaction.purchaseAmount > 100 ? 2 * Math.floor((transaction.purchaseAmount - 100)) : 0
        + transaction.purchaseAmount > 50 ? Math.floor((transaction.purchaseAmount - 50)) : 0;

        const transactionMonth = monthNames[new Date(transaction.transactionTimeStamp).getMonth()];

        if (customerPointsMap.has(transaction.customerId)) {
            const customerPoints = customerPointsMap.get(transaction.customerId);
            const pointsPerMonthMap = customerPoints.get('pointsPerMonth');

            customerPoints.set('totalPoints', customerPoints.get('totalPoints') + transactionPoints);

            if (pointsPerMonthMap.has(transactionMonth)) {
                pointsPerMonthMap.set(transactionMonth, pointsPerMonthMap.get(transactionMonth) + transactionPoints);
            } else {
                pointsPerMonthMap.set(transactionMonth, transactionPoints);
            };
        } else {
            const customerPoints = new Map();
            const pointsPerMonthMap = new Map();
            
            pointsPerMonthMap.set(transactionMonth, transactionPoints);
            customerPoints.set('totalPoints', transactionPoints);
            customerPoints.set('pointsPerMonth', pointsPerMonthMap);
            customerPointsMap.set(transaction.customerId, customerPoints);
        };
    });

    return customerPointsMap;
}
