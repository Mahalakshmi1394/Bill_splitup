export const calculateBalances = (members) => {
    if (!members || !members.length) return { total: 0, perPerson: 0, balances: {} };

    // 1. Calculate Total
    const total = members.reduce((sum, m) => sum + (Number(m.paid) || 0), 0);

    // 2. Calculate Equal Share
    const perPerson = total / members.length;

    // 3. Calculate Balances
    const balances = {};
    members.forEach(m => {
        // Balance = Paid - Share
        // Positive = Paid more than share (Get back)
        // Negative = Paid less than share (Owe)
        balances[m.name] = (Number(m.paid) || 0) - perPerson;
    });

    return { total, perPerson, balances };
};

export const generateSettlements = (balances) => {
    let debtors = [];
    let creditors = [];

    Object.entries(balances).forEach(([person, amount]) => {
        if (amount < -0.01) debtors.push({ person, amount });
        if (amount > 0.01) creditors.push({ person, amount });
    });

    debtors.sort((a, b) => a.amount - b.amount); // Ascending (most negative first)
    creditors.sort((a, b) => b.amount - a.amount); // Descending (most positive first)

    const settlements = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
        let debtor = debtors[i];
        let creditor = creditors[j];

        // The amount to settle is the minimum of what debtor owes and what creditor is owed
        let amount = Math.min(Math.abs(debtor.amount), creditor.amount);
        amount = Math.round(amount * 100) / 100;

        if (amount > 0) {
            settlements.push({
                from: debtor.person,
                to: creditor.person,
                amount
            });
        }

        debtor.amount += amount;
        creditor.amount -= amount;

        if (Math.abs(debtor.amount) < 0.01) i++;
        if (creditor.amount < 0.01) j++;
    }

    return settlements;
};
