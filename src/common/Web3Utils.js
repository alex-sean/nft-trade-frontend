export async function getGas(transaction, params) {
    try {
        return transaction.estimateGas(params)
    } catch (err) {
        console.log(err);
        return -1;
    }
}