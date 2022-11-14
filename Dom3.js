var header=document.querySelector('#main-header');
header.style.borderBottom='solid 4px #ccc';
var input=document.querySelector('input');
input.value='Hello world';
var submit=document.querySelector('input[type="submit"]');
submit.value='SEND';

var item=document.querySelector('.list-group-item');
item.style.color='red';
var lastItem=document.querySelector('.list-group-item:last-child');
lastItem.style.color='blue';
var secondItem=document.querySelector('.list-group-item:nth-child(2)');
secondItem.style.color='white';
secondItem.style.backgroundColor='green';
var thirdItem=document.querySelector('.list-group-item:nth-child(3)');
thirdItem.style.display='none';