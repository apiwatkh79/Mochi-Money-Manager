let transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

let chart = null;

function showPage(pageId){

document
.querySelectorAll(".page")
.forEach(page=>{
page.classList.remove("active");
});

document
.getElementById(pageId)
.classList.add("active");

if(pageId==="analytics"){
renderChart();
}

}

function addTransaction(){

const title =
document.getElementById("title").value;

const amount =
document.getElementById("amount").value;

const type =
document.getElementById("type").value;

const category =
document.getElementById("category").value;

if(!title || !amount){
return;
}

transactions.push({

title,
amount,
type,
category,
date:new Date().toLocaleDateString()

});

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

document.getElementById("title").value="";
document.getElementById("amount").value="";

renderTransactions();
updateSummary();
renderChart();

}

function renderTransactions(){

const list =
document.getElementById(
"transactionList"
);

if(!list) return;

list.innerHTML="";

transactions.forEach((item,index)=>{

list.innerHTML += `
<div class="card">

<h3>${item.title}</h3>

<p>${item.category}</p>

<p>${item.date}</p>

<p>${item.type}</p>

<h2>฿${Number(item.amount).toLocaleString()}</h2>

<button onclick="deleteTransaction(${index})">
ลบ
</button>

</div>

<br>
`;

});

}

function deleteTransaction(index){

transactions.splice(index,1);

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

renderTransactions();
updateSummary();
renderChart();

}

function updateSummary(){

let income=0;
let expense=0;

transactions.forEach(item=>{

if(item.type==="income"){
income += Number(item.amount);
}else{
expense += Number(item.amount);
}

});

const balance =
income-expense;

document.getElementById("incomeTotal").innerText =
"฿"+income.toLocaleString();

document.getElementById("expenseTotal").innerText =
"฿"+expense.toLocaleString();

document.getElementById("balance").innerText =
"฿"+balance.toLocaleString();

document.getElementById("savingTotal").innerText =
"฿"+balance.toLocaleString();

}

function renderChart(){

const canvas =
document.getElementById(
"financeChart"
);

if(!canvas) return;

let income=0;
let expense=0;

transactions.forEach(item=>{

if(item.type==="income"){
income += Number(item.amount);
}else{
expense += Number(item.amount);
}

});

if(chart){
chart.destroy();
}

chart = new Chart(canvas,{

type:"doughnut",

data:{
labels:["Income","Expense"],
datasets:[{
data:[income,expense]
}]
}

});

}

renderTransactions();
updateSummary();
