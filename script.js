const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calcBtn = document.getElementById("calculate-wealth");

let data = [];
let totalRan = false;

//fetch user - add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

/**
 * add user to User array - UpdateDom called
 * @param {User} newUser
 */
const addData = (newUser) => {
  data.push(newUser);

  updateDom();
};

const updateDom = (providedData = data) => {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach((item) => {
    const el = document.createElement("div");
    el.classList.add("person");
    el.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;
    main.appendChild(el);
  });
};

const updateTotal = () => {
  if (data.length > 0) {
    let total = data.reduce((acc, user) => acc + user.money, 0);
    total = formatMoney(total);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${total}</strong></h3>`;
    main.appendChild(wealthEl);
    totalRan = true;
  }
};

const formatMoney = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", () => {
  if (data.length > 0) {
    data = data.map((item, index) => {
      return { name: item.name, money: item.money * 2 };
    });
    updateDom();
    if (totalRan) updateTotal();
  }
});

showMillBtn.addEventListener("click", () => {
  if (data.length > 0) {
    data = data.filter((e) => e.money >= 1000000);
    updateDom();
    if (totalRan) updateTotal();
  }
});

sortBtn.addEventListener("click", () => {
  if (data.length > 1) {
    data.sort(function (a, b) {
      return a.money - b.money;
    });
    data.reverse();
    updateDom();
  }
});

calcBtn.addEventListener("click", updateTotal);
