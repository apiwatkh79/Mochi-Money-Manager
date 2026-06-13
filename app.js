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

    date:new Date()
    .toLocaleDateString()

  });

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

  renderTransactions();
  updateSummary();

}

function renderTransactions(){

  const list =
  document.getElementById(
    "transactionList"
  );

  if(!list) return;

  list.innerHTML = "";

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

}

function updateSummary(){

  let income = 0;
  let expense = 0;

  transactions.forEach(item=>{

    if(item.type === "income"){
      income += Number(item.amount);
    }else{
      expense += Number(item.amount);
    }

  });

  const balance =
  income - expense;

  const incomeEl =
  document.getElementById("incomeTotal");

  const expenseEl =
  document.getElementById("expenseTotal");

  const balanceEl =
  document.getElementById("balance");

  const savingEl =
  document.getElementById("savingTotal");

  if(incomeEl)
    incomeEl.innerText =
    "฿" + income.toLocaleString();

  if(expenseEl)
    expenseEl.innerText =
    "฿" + expense.toLocaleString();

  if(balanceEl)
    balanceEl.innerText =
    "฿" + balance.toLocaleString();

  if(savingEl)
    savingEl.innerText =
    "฿" + balance.toLocaleString();

}

renderTransactions();
updateSummary();
