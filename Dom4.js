// var itemList=document.querySelector('#items');
// console.log(itemList.parentNode);
// itemList.parentNode.style.backgroundColor='#f4f4f4';
// console.log(itemList.parentNode.parentNode.parentNode);

// var itemList=document.querySelector('#items');
// console.log(itemList.parentElement);
// itemList.parentElement.style.backgroundColor='#f4f4f4';
// console.log(itemList.parentElement.parentElement.parentElement);

// console.log(itemList.childNodes);
// console.log(itemList.children);
// itemList.children[1].style.backgroundColor='green';

// console.log(itemList.firstChild);
// console.log(itemList.firstElementChild);
// itemList.firstElementChild.textContent='Hello1';

// console.log(itemList.lastElementChild);
// itemList.lastElementChild.textContent='Hello4';
// console.log(itemList.nextSibling);
// console.log(itemList.nextElementSibling);
// console.log(itemList.previousSibling);
// console.log(itemList.previousElementSibling);
// itemList.previousElementSibling.style.color='green';

var newDiv=document.createElement('div');
newDiv.className='hello';
newDiv.id='hello';
newDiv.setAttribute('title', 'Hello div');

var newDivText=document.createTextNode('HEllo');
newDiv.appendChild(newDivText);

var container=document.querySelector('header .container');
var h1=document.querySelector('header h1');
console.log(newDiv);
newDiv.style.fontSize='30px';
container.insertBefore(newDiv,h1);

var newDiv1=document.createElement('li');
newDiv1.className='list-group-item';

var newDivText1=document.createTextNode('HEllo');
newDiv1.appendChild(newDivText1);
// console.log(newDiv1);
var word=document.querySelector('#items');
var word2=document.querySelector('.list-group-item');
word.insertBefore(newDiv1,word2);