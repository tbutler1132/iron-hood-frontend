// A user can only have one of each stock

////



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
    const valuesArray = []
    portfolio.forEach(stockObj => {
        renderStock(stockObj)
      })
      const portfolioValue = () => {
        const value = document.querySelector('.portfolio')
        const holdings = document.querySelectorAll('#holdings')

        const createArray = () => {
        holdings.forEach(value => {
            const valueNumbers = parseInt(value.innerText)
            valuesArray.push(valueNumbers)
        })
            const totalValue = valuesArray.reduce((a, b) => a + b, 0)
            value.innerHTML = `
            Portfolio Value: ${totalValue}
            `
           

    }
    
    createArray()      
}

portfolioValue()
}


const renderStock = (stockObj) => {
    holdingsTable = document.querySelector('tbody')
    stockRow = document.createElement('tr')
    stockRow.classList = 'table-row'
    if (stockObj.totals[0]){
        stockRow.innerHTML = `
            <td>${stockObj.company_name}</td>
            <td>${stockObj.ticker}</td>
            <td id='price'>${stockObj.price}</td>
            <td id="shares"> ${stockObj.totals[0].count} </td>
            <td id='holdings'> shares * price </td>
            <td data-id='${stockObj.id}'</td>
        `  
    }
    else {
        stockRow.innerHTML = `
            <td>${stockObj.company_name}</td>
            <td>${stockObj.ticker}</td>
            <td id='price'>${stockObj.price}</td>
            <td id="shares"> 0 </td>
            <td id='holdings'> shares * price </td>
            <td data-id='${stockObj.id}'</td>
        `     
    }         
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
    fetch('http://localhost:3000/users/94 ')
    .then(response => response.json())
    .then(user =>{ 
        renderStocks(user.purchased_stocks)
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

            const clearTableAfterBuy = () => {
                tableRows = document.querySelectorAll('.table-row')
                console.log(tableRows)
                tableRows.forEach (row => {row.remove()})
            }
            
            clearTableAfterBuy()

            const oldCount = e.target.parentElement.parentElement.children[3].textContent
            const newCount = parseInt(oldCount) + 1
            const stockIdString = e.target.parentElement.dataset.id
            const stockData = e.target.parentElement
            const holdings = stockData.previousElementSibling.previousElementSibling.previousElementSibling.textContent
            const stockId = parseInt(stockIdString)
            
            
            const decreaseBalance = () =>{
                let stockPrice = parseInt(holdings)
                const balanceString = document.querySelector('.balance').textContent
                let userBalance = parseInt(balanceString)
                let newBalance = userBalance - stockPrice
                const balance = document.querySelector('.balance')
                // debugger
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
                fetch('http://localhost:3000/users/94' , options)
                .then(response => response.json())
                // .then(newBalance => {
                //     const balance = document.querySelector('.balance')
                //     balance.textContent = `Balance: ${newBalance.balance}`
                    
                // })
            }

    
            const buyTransaction = () =>{

                const transactionObj = {
                    user_id: 94 , 
                    stock_id: stockId,
                    transaction_type: "Buy",
                    stock_count: 10
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
                    
                })
                
                
            }

            const numberOfStocksBought = (userId) => {
                
                const totalObj = {
                    user_id: userId,
                    stock_id: stockId,
                    count: 1
                }

                const postOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify(totalObj) 
                }

                const patchOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({count: newCount }) 
                }

                fetch('http://localhost:3000/users/' + userId)
                .then(response => response.json())
                .then(user => {
                    const stocks = user.totals.map(total => total.stock_id)

                    if (stocks.includes(stockId)){
                        const wantedTotal = user.totals.find(total => total.stock_id === stockId)
                        const patchId = wantedTotal.id
                        fetch('http://localhost:3000/totals/' + patchId, patchOptions)
                        .then(response => response.json())
                        .then(total => { 
                            getUsersStocks()
                            
                        })
                    } 
                    else {
                        fetch('http://localhost:3000/totals', postOptions)
                        .then(response => response.json())
                        .then(total => getUsersStocks())

                    }
                 
                })
            }    
            decreaseBalance()
            buyTransaction()
            numberOfStocksBought(94)
        
  
        } else if (e.target.innerText === 'Sell'){

            const clearTableAfterBuy = () => {
                tableRows = document.querySelectorAll('.table-row')
                console.log(tableRows)
                tableRows.forEach (row => {row.remove()})
            }

            clearTableAfterBuy()

            const oldCount = e.target.parentElement.parentElement.children[3].textContent
            const newCount = parseInt(oldCount) - 1
            const stockIdString = e.target.parentElement.dataset.id
            const stockData = e.target.parentElement
            const holdings = stockData.previousElementSibling.previousElementSibling.previousElementSibling.textContent
            const stockId = parseInt(stockIdString)
            
            
            const decreaseBalance = () =>{
                let stockPrice = parseInt(holdings)
                const balanceString = document.querySelector('.balance').textContent
                let userBalance = parseInt(balanceString)
                let newBalance = userBalance + stockPrice
                const balance = document.querySelector('.balance')
                // debugger
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
                fetch('http://localhost:3000/users/94' , options)
                .then(response => response.json())
                // .then(newBalance => {
                //     const balance = document.querySelector('.balance')
                //     balance.textContent = `Balance: ${newBalance.balance}`
                    
                // })
            }

    
            const sellTransaction = () =>{

                const transactionObj = {
                    user_id: 94, 
                    stock_id: stockId,
                    transaction_type: "Sell",
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
                })
                
                
            }

            const numberOfStocksSold = (userId) => {
                
                // const totalObj = {
                //     user_id: userId,
                //     stock_id: stockId,
                //     count: 1
                // }

                // const deleteOptions = {
                //     method: 'DELETE',
                // }

                const patchOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({count: newCount }) 
                }

                fetch('http://localhost:3000/users/' + userId)
                .then(response => response.json())
                .then(user => {
                    const stocks = user.totals.map(total => total.stock_id)
                    if (stocks.includes(stockId)){
                        const wantedTotal = user.totals.find(total => total.stock_id === stockId)
                        const patchId = wantedTotal.id
                        fetch('http://localhost:3000/totals/' + patchId, patchOptions)
                        .then(response => response.json())
                        .then(total => {
                            getUsersStocks()
                        })
                        // .then(total => {
                        //     tableRows = document.querySelectorAll('.table-row')
                        //     tableRows.forEach (row => {row.remove()})
                        //     getUsersStocks(total)
                        // })
                    } 
                    // else {
                    //     fetch('http://localhost:3000/totals', postOptions)
                    //     .then(response => response.json())
                    //     .then(total => console.log(total))

                    // }
                 
                })
            }    
            
            decreaseBalance()
            sellTransaction()
            numberOfStocksSold(94)

        }
    })
}






getStockName = (id) => {
    fetch('http://localhost:3000/users/' + id)
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



// get transactions. if transaction.stock_id 

//if header.textContent === 'Portfolio' && blah === stock.company_name
    //blah blah + transaction stock count

// redirect to total.id_path



// GET totals
// stocks = totals.map.totals.stock_id
// if stocks includes stock_id
        //pass in stock_id and patch
// else 
        //pass in new_obj with user_id and count

// const getTotals = () => {
//     fetch('http://localhost:3000/stocks')
//     .then(response => response.json())
//     .then(totals => {
//         stocks = totals.map(total => total.stock_id)
//         if stocks.include?(stock_id)
//             patch
//              options 
//         else
//             post    
//     })

// }



