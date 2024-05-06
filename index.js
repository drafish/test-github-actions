import Web3 from 'web3';
import fs from 'fs';

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/fb57c8644ba1403d8b63d81dfa067c97'));

async function getTransactionsByAccount(contractAddress, startBlockNumber, endBlockNumber) {
    let transactions = []

    for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        let block = await web3.eth.getBlock(i, true);

        if (block != null && block.transactions != null) {
            block.transactions.forEach((e) => {
                if (contractAddress == "*" || contractAddress == e.to) {
                    transactions.push(e);
                }
            });
        }
    }
    console.log(JSON.stringify(transactions))

    return transactions;
}

getTransactionsByAccount('0x60E4d786628Fea6478F785A6d7e704777c86a7c6', 19809881, 19809978).then(transactions => {
    fs.writeFile('transactions.json', JSON.stringify(transactions, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});
