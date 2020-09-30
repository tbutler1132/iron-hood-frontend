// A user can only have one of each stock





document.addEventListener('DOMContentLoaded', function(e){
    const header = document.querySelector('.header')
    
//Home Page

// const getUsers = () => {
//     const home = document.querySelector('.home-page')
//     home.innerHTML = `
//     <h3>Sign In</h3><br>
//     <form><input type="text" id="name" name="fname"><br>
//     <input type="submit" value="Submit" class="btn btn-success">
//     </form>
//     `
//     const logInForm = document.querySelector('form')
//     logInForm.addEventListener('submit', function(e){
//         e.preventDefault()
        
//     const nameInput = document.querySelector('#name').value
    
//     fetch('http://localhost:3000/users')
//     .then(response => response.json())
//     .then(users =>{
//         const filteredUsers = users.filter(user => {
//             return user.name.includes(nameInput)
//         })
//         const currentUser = filteredUsers[0].id
//         const body = document.querySelector('body')
//         body.dataset.id = currentUser
//         console.log(body)
//         })
//     })
// }

// getUsers()

    
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
        <td data-id='${stockObj.id}'</td>
    `       
    const button = stockRow.lastElementChild
    button.innerHTML = `<button class="sell-button btn btn-danger">Sell</button>`
    const shares = stockRow.querySelector('#shares').textContent
    const price = stockRow.querySelector('#price').textContent
    const holdings = shares * price
    const currentHoldings = stockRow.querySelector('#holdings')
    currentHoldings.innerText = holdings
    
    holdingsTable.append(stockRow)
}

const getUsersStocks = () =>{
    fetch('http://localhost:3000/users/59')
    .then(response => response.json())
    .then(user =>{ 
        renderStocks(user.holdings)
        const balance = document.querySelector('.balance')
        balance.innerHTML = `${user.balance}`
    })
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
            const buttons = row.children[5]
            buttons.innerHTML = '<button class="btn btn-success"> Buy </button>' })
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
    const clearTable = () => {
        tableRows = document.querySelectorAll('.table-row')
        tableRows.forEach (row => {row.remove()})
    }

const clickHandler = () => {
    document.addEventListener('click', function(e){
        if(e.target.innerText === 'IronHood //'){
            clearTable()
            header.innerHTML = `<h1> Portfolio </h1>`
            getUsersStocks()
    }
        if (e.target.matches('#buy-button')){
            header.innerHTML = `
            <h1> Purchase </h1>
            `
            showStockIndex()
        }
        else if (e.target.innerText === 'Buy'){
            
            const stockIdString = e.target.parentElement.dataset.id
            const stockData = e.target.parentElement
            const holdings = stockData.previousElementSibling.textContent
            const stockId = parseInt(stockIdString)
            
            
            const updateBalance = () =>{
                let stockValue = parseInt(holdings)
                const balanceString = document.querySelector('.balance').textContent
                console.log(balanceString)
                let userBalance = parseInt(balanceString)
                let newBalance = userBalance - stockValue
                const balance = document.querySelector('.balance')
                balance.textContent = `${newBalance}`

                

                header.innerHTML = `
                <h1> Portfolio </h1>
                `
                
                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({balance: newBalance})
                }
                fetch('http://localhost:3000/users/59' , options)
                .then(response => response.json())
                // .then(newBalance => {
                //     const balance = document.querySelector('.balance')
                //     balance.textContent = `Balance: ${newBalance.balance}`
                    
                // })
            }

    
            const buyTransaction = () =>{

                const transactionObj = {
                    user_id: 59, 
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
                .then(transaction => {
                    tableRows = document.querySelectorAll('.table-row')
                    tableRows.forEach (row => {row.remove()})
                    getUsersStocks(transaction)
                })
                
                
            }

        const numberOfStocksBought = () => {
            
        }    
            
            updateBalance()
            buyTransaction()
        }
    })
}



    

// Update User Portfolio
const stocksArray = () =>{
    fetch('http://localhost:3000/stocks')
    .then(response => response.json())
    .then(stocks=> filterStocks(stocks))
}
stocksArray()

const filterStocks = (allStocks) => {
    const searchBar = document.querySelector('#searchBar')
    searchBar.addEventListener('keyup', e => {
        const input = e.target.value.toLowerCase()
        
        const filteredStocks = allStocks.filter(stock => {
            return stock.company_name.toLowerCase().includes(input) || stock.ticker.toLowerCase().includes(input)
        })
        let tableRows = document.querySelectorAll('.table-row')
        tableRows.forEach (row => {row.remove()})
        renderStocks(filteredStocks)
        header.innerHTML = `<h1> Purchase </h1>`
        const row = document.querySelectorAll('.table-row')
            row.forEach(row => {
            const buttons = row.children[5]
            buttons.innerHTML = '<button class="btn btn-success"> Buy </button>' })
    })
}




// Modal
// const buyModal = () =>{
//     const modalDiv = document.createElement('div')
//     modalDiv.innerHTML = `
//     <div class="modal-content">
//         <div class="modal-header">
//             <span class="close">&times;</span>
//             <h2>Purchase</h2>
//         </div>
//         <div class="modal-body">
//             <p>Some text in the Modal Body</p>
//             <p>Some other text...</p>
//         </div>
//         <div class="modal-footer">
//             <h3>Ironhood</h3>
//         </div>
//     </div>
//     `
//     const body = document.querySelector('body')
//     body.append(modalDiv)
// }



//
//Call functions
getUsersStocks()
clickHandler()
})
