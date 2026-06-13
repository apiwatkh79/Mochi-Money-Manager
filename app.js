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
updateBudget();
updateGoal();
updateStats();
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
updateBudget();
updateGoal();
updateStats();
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

function updateBudget(){

let food = 0;
let travel = 0;
let shopping = 0;

transactions.forEach(item=>{

if(item.type !== "expense") return;

if(item.category==="อาหาร"){
food += Number(item.amount);
}

if(item.category==="เดินทาง"){
travel += Number(item.amount);
}

if(item.category==="ช้อปปิ้ง"){
shopping += Number(item.amount);
}

});

const foodLimit = 5000;
const travelLimit = 3000;
const shoppingLimit = 5000;

const foodPercent = (food/foodLimit)*100;
const travelPercent = (travel/travelLimit)*100;
const shoppingPercent = (shopping/shoppingLimit)*100;

const foodBar = document.getElementById("foodBar");
const travelBar = document.getElementById("travelBar");
const shoppingBar = document.getElementById("shoppingBar");

if(foodBar){
foodBar.style.width =
Math.min(foodPercent,100)+"%";
}

if(travelBar){
travelBar.style.width =
Math.min(travelPercent,100)+"%";
}

if(shoppingBar){
shoppingBar.style.width =
Math.min(shoppingPercent,100)+"%";
}

}

function updateGoal(){

let income = 0;
let expense = 0;

transactions.forEach(item=>{

if(item.type==="income"){
income += Number(item.amount);
}else{
expense += Number(item.amount);
}

});

const saving = income - expense;
const goal = 100000;

const percent = (saving/goal)*100;

const bar =
document.getElementById("goalBar");

const text =
document.getElementById("goalProgress");

if(bar){
bar.style.width =
Math.min(percent,100)+"%";
}

if(text){
text.innerText =
percent.toFixed(1)+"%";
}

}
function updateStats(){

let incomeCount = 0;
let expenseCount = 0;

let incomeTotal = 0;
let expenseTotal = 0;

transactions.forEach(item=>{

if(item.type==="income"){

incomeCount++;
incomeTotal += Number(item.amount);

}else{

expenseCount++;
expenseTotal += Number(item.amount);

}

});

const total =
transactions.length;

const totalEl =
document.getElementById(
"totalTransactions"
);

const avgIncomeEl =
document.getElementById(
"avgIncome"
);

const avgExpenseEl =
document.getElementById(
"avgExpense"
);

if(totalEl){
totalEl.innerText = total;
}

if(avgIncomeEl){

avgIncomeEl.innerText =
"฿" +
(incomeCount
? incomeTotal/incomeCount
:0).toLocaleString();

}

if(avgExpenseEl){

avgExpenseEl.innerText =
"฿" +
(expenseCount
? expenseTotal/expenseCount
:0).toLocaleString();

}

}
renderTransactions();
updateSummary();
updateBudget();
updateGoal();
updateStats();
renderChart();
