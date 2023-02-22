async function addExpense(event) {
    try {
       event.preventDefault(event)

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

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const token = localStorage.getItem('token')
        const res = await axios.get("http://localhost:3000/expense/getExpenses", { headers: { "Authorization": token }})
            for(var i=0;i<res.data.allExpenses.length;i++){
                showNewUser(res.data.allExpenses[i]);
            }
        } catch (err) {
            console.log(err);
        }
})

function showNewUser(user){
    try{
    document.getElementById('amount').value='';
    document.getElementById('description').value='';
    document.getElementById('categories').value='';

    const parentNode=document.getElementById('list');
    const childHTML=`<li id=${user.id}> ${user.amount} - ${user.description} - ${user.category}
        <button onclick=deleteUser('${user.id}')>Delete User</button>
        </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML
    } catch(err) {
        console.log(err)
    }
}

async function deleteUser(userId){
    try{
        const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:3000/expense/deleteExpense/${userId}`, { headers: { "Authorization": token }})
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

document.getElementById('rzp-button1').onclick = async function (event) {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/purchase/premiumMemberShip', { headers: { 'Authorization': token }})
    var options = {
        "key": res.data.key_id,
        "order_id": res.data.order.id,
        "handler": async function (res) {
            await axios.post('http://localhost:3000/purchase/updateTransactionStatus', {
                order_id: options.order_id,
                payment_id: res.razorpay_payment_id
            }, { headers: {'Authorization': token }})
            alert('You are a premium user now!')
        }
    }
    const rzp1 = new Razorpay(options)
    rzp1.open()
    event.preventDefault()

    rzp1.on('payment.failed', function (res) {
        alert('Something went wrong!')
    })
}