document.addEventListener('DOMContentLoaded', function(e){
header = document.querySelector('h1')

//Home Page

const renderStocks = (portfolio) => {
    portfolio.forEach(stockObj => {
        renderStock(stockObj)
      })
}


const renderStock = (stockObj) => {
    holdingsTable = document.querySelector('tbody')
    stockRow = document.createElement('tr')
    stockRow.classList = 'table-row'
    stockRow.innerHTML = `
        <td>${stockObj.company_name}</td>
        <td>${stockObj.ticker}</td>
        <td id='price'>${stockObj.price}</td>
        <td id="shares"> 10 </td>
        <td id='holdings'> shares * price </td>
        <td data-id='${stockObj.id}'button class="sell-button">Sell</button></td>
    `
    const shares = stockRow.querySelector('#shares').textContent
    const price = stockRow.querySelector('#price').textContent
    const holdings = shares * price
    const currentHoldings = stockRow.querySelector('#holdings')
    currentHoldings.innerText = holdings
    
    holdingsTable.append(stockRow)
}

const getUsersStocks = () =>{
    fetch('http://localhost:3000/users/9')
    .then(response => response.json())
    .then(user => renderStocks(user.stocks))
}

//Stocks page

const showStockIndex = () =>{
    
    const clearTable = () => {
        tableRows = document.querySelectorAll('.table-row')
        tableRows.forEach (row => {row.remove()})
    }


    const renderStocks = (stockCollection) => {
        stockCollection.forEach(stockObj => {
            renderStock(stockObj)
        })
        const changeToBuyBotton = () =>{
            const row = document.querySelectorAll('.table-row')
            row.forEach(row => {
            const sellButtons = row.children[5]
            sellButtons.innerHTML = '<button> Buy </button>' })
            // sellButtons.forEach(button => {button.textContent = "Buy"})
        }
        changeToBuyBotton() 
    }

    const getStocks = () =>{
        fetch('http://localhost:3000/stocks')
        .then(response => response.json())
        .then(stocks=> renderStocks(stocks))
    }

    clearTable()
    getStocks()
}

//Click Handler

const clickHandler = () => {
    document.addEventListener('click', function(e){
        if (e.target.matches('#buy-button')){
            header.textContent = "Search"
            showStockIndex()
        }
        else if (e.target.innerText === 'Buy'){
            const stockIdString = e.target.parentElement.dataset.id
            const stockId = parseInt(stockIdString)
            const buyTransaction = () =>{

                const transactionObj = {
                    user_id: 9, 
                    stock_id: stockId,
                    transaction_type: "Buy",
                    stock_count: 1
                } 
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify(transactionObj)
                }

                fetch('http://localhost:3000/transactions/', options)
                .then(response => response.json())
                .then(transaction => console.log(transaction))
                

            }
        buyTransaction()  
        getUsersStocks()
        }

    })
}


// Update User Portfolio










//Call functions
getUsersStocks()
clickHandler()
})
