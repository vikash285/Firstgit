async function addExpense(event) {
    try {
       event.preventDefault()

       const expenseDetails = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
       }
       const token = localStorage.getItem('token')
       const res = await axios.post("http://localhost:3000/expense/addExpenses", expenseDetails, { headers: { "Authorization": token }})
       showNewUser(res.data.userExpense)
    } catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err}</div>`
    }
}

function setLimit(event) {
    try {
          event.preventDefault()
          const limit = event.target.range.value
          localStorage.setItem('keyLimit', limit)
    } catch (err) {
        console.log(err)
    }
}

function showPremiumUserMessage () {
    document.getElementById('rzp-button1').style.visibility = 'hidden'
    document.getElementById('msg').innerHTML = 'You are Premium User'
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const token = localStorage.getItem('token')
        const decodeToken = parseJwt(token)
        const isPremiumUser = decodeToken.isPremiumUser
        if (isPremiumUser) {
            showPremiumUserMessage()
            showLeaderBoard()
        }

        const page = 1
        const limit = localStorage.getItem('keyLimit')
        const res = await axios.get(`http://localhost:3000/expense/getExpenses?page=${page}&limit=${limit}`, { headers: { "Authorization": token }})
            for(var i=0;i<res.data.allExpenses.length;i++){
                showNewUser(res.data.allExpenses[i]);
            }
            showPagination(res.data)
        } catch (err) {
            console.log(err);
        }
})

function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage,
    limit
}) {
     const pagination = document.getElementById('container')
     pagination.innerHTML = ''

     if(hasPreviousPage) {
        const btn2 = document.createElement('button')
        btn2.innerHTML = previousPage
        btn2.addEventListener('click', async() => await getExpenses(previousPage, limit))
        pagination.appendChild(btn2)
     }
    
        const btn1 = document.createElement('button')
        btn1.innerHTML = `<h3>${currentPage}</h3>`
        btn1.addEventListener('click', async() => await getExpenses(currentPage, limit))
        pagination.appendChild(btn1)
    
     if(hasNextPage) {
        const btn3 = document.createElement('button')
        btn3.innerHTML = nextPage
        btn3.addEventListener('click', async() => await getExpenses(nextPage, limit))
        pagination.appendChild(btn3)
     }
}

async function getExpenses(page, limit) {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:3000/expense/getExpenses?page=${page}&limit=${limit}`, { headers: { "Authorization": token }})
        for(var i=0;i<res.data.allExpenses.length;i++){
            showNewUser(res.data.allExpenses[i]);
        }
        showPagination(res.data)
    } catch (err) {
        console.log(err);
    }
}

function showNewUser(user){
    try{
    document.getElementById('amount').value='';
    document.getElementById('description').value='';
    document.getElementById('categories').value='';

    const parentNode=document.getElementById('list');
    const childHTML=`<li id=${user.id}> ${user.amount} - ${user.description} - ${user.category}
        <button onclick=deleteUser('${user.id}','${user.amount}')>Delete User</button>
        </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML
    } catch(err) {
        console.log(err)
    }
}

async function deleteUser(userId, amount){
    try{
        const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:3000/expense/deleteExpense/${userId}/${amount}`, { headers: { "Authorization": token }})
    removeUserFromScreen(userId);
    } catch (err) {
        console.log(err);
    }
}

function removeUserFromScreen(userId){
    try{
    const parentNode=document.getElementById('list');
    const childToBeDeleted=document.getElementById(userId);
    if(childToBeDeleted){
        parentNode.removeChild(childToBeDeleted)
    }
} catch (err) {
    console.log(err);
}
}

function showLeaderBoard () {
    const inputElement = document.createElement("input")
    inputElement.type = "button"
    inputElement.value = 'Show Leaderboard'
    
    inputElement.onclick = async () => {
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get("http://localhost:3000/premium/showLeaderBoard", { headers: { "Authorization": token }})

        var leaderboardEle = document.getElementById('leaderboard')
        leaderboardEle.innerHTML += '<h1> Leader Board </h1>'
        userLeaderBoardArray.data.forEach( (userDetails) => {
            leaderboardEle.innerHTML += `<li> Name - ${userDetails.name}, Total Expense - ${userDetails.totalExpenses || 0}`
        })
    }
    document.getElementById('msg').appendChild(inputElement)
}

async function download(){
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/expense/download', { headers: {"Authorization" : token} })

        addUrl(response.data.fileURL)
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    } catch (err) {
        console.log(err)
    }
}

async function addUrl(fileUrl) {
try{
    const urlDetails = {
        url: fileUrl
       }
    const token = localStorage.getItem('token')
    const res = await axios.post("http://localhost:3000/expense/addUrls", urlDetails, { headers: { "Authorization": token }})
    showUrl(res.data.fileURL)
} catch (err) {
    console.log(err)
}
}

function showUrl(url) {
    const inputElement = document.createElement("input")
    inputElement.type = "button"
    inputElement.value = 'Show Download History'
    
    inputElement.onclick = async () => {
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get("http://localhost:3000/expense/getUrls", { headers: { "Authorization": token }})
        console.log(userLeaderBoardArray)
        var leaderboardEle = document.getElementById('url')
        leaderboardEle.innerHTML += '<h1> Download History </h1>'
        userLeaderBoardArray.data.allUrls.forEach((fileURL) => {
            leaderboardEle.innerHTML += `<li> URL - ${fileURL.url}, Time - ${fileURL.createdAt}`
        })
    }
    document.getElementById('msg').appendChild(inputElement)
}

document.getElementById('rzp-button1').onclick = async function (event) {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/purchase/premiumMemberShip', { headers: { 'Authorization': token }})
    var options = {
        "key": res.data.key_id,
        "order_id": res.data.order.id,
        "handler": async function (res) {
            const response = await axios.post('http://localhost:3000/purchase/updateTransactionStatus', {
                order_id: options.order_id,
                payment_id: res.razorpay_payment_id
            }, { headers: {'Authorization': token }})
            alert('You are a premium user now!')

            showPremiumUserMessage()
            localStorage.setItem('token', response.data.token)
            showLeaderBoard()
        }
    }
    const rzp1 = new Razorpay(options)
    rzp1.open()
    event.preventDefault()

    rzp1.on('payment.failed', function (res) {
        alert('Something went wrong!')
    })
}