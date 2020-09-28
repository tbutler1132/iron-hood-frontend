document.addEventListener('DOMContentLoaded', function(e){
header = document.querySelector('h1')

//Home Page

const renderStocks = (portfolio) => {
    portfolio.forEach(stockObj => {
        renderStock(stockObj)
      })
}


const renderStock = (stockObj) => {
    holdingsTable = document.querySelector('.stock-table')
    stockRow = document.createElement('tr')
    stockRow.classList = 'table-row'
    stockRow.innerHTML = `
        <th>${stockObj.company_name}</th>
        <th>${stockObj.ticker}</th>
        <th>${stockObj.price}</th>
        <th>Sell</th>
    `
    holdingsTable.append(stockRow)
}

const getUsersStocks = () =>{
    fetch('http://localhost:3000/users/8')
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

    })
}














//Call functions
getUsersStocks()
clickHandler()
})
