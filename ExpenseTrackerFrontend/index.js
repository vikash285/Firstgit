async function addExpense(event) {
    try {
       event.preventDefault(event)

       const expenseDetails = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
       }

       const res = await axios.post("http://localhost:3000/expense/addExpenses", expenseDetails)
       showNewUser(res.data.userExpense)
    } catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err}</div>`
    }
}

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const res = await axios.get("http://localhost:3000/expense/getExpenses")
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
    await axios.delete(`http://localhost:3000/expense/deleteExpense/${userId}`)
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