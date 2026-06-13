let transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

function showPage(pageId){

document
.querySelectorAll(".page")
.forEach(page=>{
page.classList.remove("active");
});

document
.getElementById(pageId)
.classList.add("active");

}

function addTransaction(){

const title =
document
.getElementById("title")
.value;

const amount =
document
.getElementById("amount")
.value;

const type =
document
.getElementById("type")
.value;

if(!title || !amount){
return;
}

transactions.push({
title,
amount,
type
});

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

renderTransactions();
}

function renderTransactions(){

const list =
document
.getElementById("transactionList");

list.innerHTML = "";

transactions.forEach(item=>{

list.innerHTML += `
<div class="card">

<h3>${item.title}</h3>

<p>
${item.type}
</p>

<h2>
฿${item.amount}
</h2>

</div>
<br>
`;

});

}

renderTransactions();
