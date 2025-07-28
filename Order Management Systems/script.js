var menuList = [
  { name: "French Fries", Course: "Stater", Price: "105" },
  {
    name: "Crusty Garlic Focaccia with Melted Cheese",
    Course: "Stater",
    Price: "105",
  },
  {
    name: "Home Country Fries with Herbs & Chilli Flakes",
    Course: "Stater",
    Price: "105",
  },
  {
    name: "French Fries with Cheese & Jalapenos",
    Course: "Stater",
    Price: "105",
  },
  { name: "Noodles", Course: "Stater", Price: "105" },
  { name: "Pizza", Course: "Stater", Price: "105" },
  { name: "Panner", Course: "Main Course", Price: "105" },
  { name: "Biryani", Course: "Main Course", Price: "145" },
  { name: "Dal", Course: "Main Course", Price: "160" },
  { name: "Mushroom", Course: "Main Course", Price: "160" },
  { name: "Shakes", Course: "Beverages", Price: "160" },
  { name: "Cold Drink", Course: "Beverages", Price: "160" },
  { name: "Ice-cream", Course: "Dessert", Price: "160" },
  { name: "Brownie", Course: "Dessert", Price: "160" },
];

buildmenu(menuList);

function buildmenu(data) {
  let table = document.getElementById("content-menu");
  let rows = "";

  for (let i = 0; i < data.length; i++) {
    let row =
      "<div class='items' draggable ='true'> " +
      "<h2 id='name'>" +
      data[i].name +
      "</h2>" +
      "<span id='price'>" +
      data[i].Price +
      "</span>" +
      "</div>";

    rows += row;
  }

  table.innerHTML = rows;
}

const tableList = [
  { name: "Table 1", total: "0", order: "0", items: [] },
  { name: "Table 2", total: "0", order: "0", items: [] },
  { name: "Table 3", total: "0", order: "0", items: [] },
];

buildtable(tableList);

function buildtable(data) {
  let table = document.getElementById("content-table");
  let rows = "";

  for (let i = 0; i < data.length; i++) {
    let row = `<div class='block' data-table='${i + 1}'> <h2> ${
      data[i].name
    } </h2><div>  Total: <span class='total'> ${
      data[i].total
    } </span>    Items: <span class='order'> ${
      data[i].order
    }</span> </div></div>`;

    rows += row;
  }

  table.innerHTML = rows;
}

const tableBlocks = document.querySelectorAll(".block");

tableBlocks.forEach((tableBlock) => {
  tableBlock.addEventListener("click", () => {
    // Create a popup element
    const popup = document.createElement("div");
    popup.classList.add("popup");

    // Set the content of the popup
    const tableIndex = tableBlock.dataset.table;
    const table = tableList[tableIndex - 1];
    const itemsHTML = table.items
      .map(
        (item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)}</td>
        <td> Number of Servings <input type="text" id="count-input" value="${
          item.quantity
        }"><div id="arrow-button"></div> </td>
        <td><button class="delete-item"><i class="fas fa-trash"></i></button></td>
      </tr>
    `
      )
      .join("");

    popup.innerHTML = `
      <h3> ${table.name} | Order Details <button class="close" id ="X">X</button></h3>
      <table >
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Price</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody class='popup-content'>
          ${itemsHTML} 
        </tbody>
      </table>
      <p >Total: <span class='totalbill'>${table.total} </span></p>
      <button class="bill" >CLOSE SESSION (GENERATE BILL)</button>
      
    `;

    // Add the popup to the page
    document.body.appendChild(popup);

    // Add event listener to the delete buttons

    const deleteButtons = popup.querySelectorAll(".delete-item");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        // Get the index of the item to be deleted
        const tableRow = event.target.closest("tr");
        const index =
          Array.from(popup.querySelectorAll("tr")).indexOf(tableRow) - 1;

        // Remove the corresponding item from the table's "items" array
        table.items.splice(index, 1);

        // Update the popup content to reflect the changes
        let changeTotal = 0;
        let changeOrder = 0;
        if (index === 0) {
          changeTotal = 0;
          table.order = 0;
          const tableOrder = tableBlock.querySelector(".order");
          const tableTotal = tableBlock.querySelector(".total");
          tableOrder.textContent = table.order;
          tableTotal.textContent = changeTotal;

          const popup = document.querySelector(".popup");
          popup.querySelector(".totalbill").textContent = changeTotal;
        }

        const itemsHTML = table.items
          .map((itemdata, index) => {
            item = itemdata;
            changeTotal += parseFloat(item.price.toFixed(2));
            changeOrder += 1;
            table.total = changeTotal;
            table.order = changeOrder;
            const tableOrder = tableBlock.querySelector(".order");
            const tableTotal = tableBlock.querySelector(".total");
            tableOrder.textContent = changeOrder;
            tableTotal.textContent = changeTotal;
            const popup = document.querySelector(".popup");
            popup.querySelector(".totalbill").textContent = changeTotal;
            return `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.price.toFixed(2)}</td>
          <td> Number of Servings <input type="text" id="count-input" value="${
            item.quantity
          }"><div id="arrow-button"></div> </td>
          <td><button class="delete-item"><i class="fas fa-trash"></i></button></td>
        </tr>
      `;
          })
          .join("");
        popup.querySelector(".popup-content").innerHTML = itemsHTML;

        // Add event listeners to the delete buttons in the new items list
        const newDeleteButtons = popup.querySelectorAll(".delete-item");
        newDeleteButtons.forEach((newButton) => {
          newButton.addEventListener("click", newDeleteButtons);
        });
      });
    });

    // Add click event listener to the close button
    const closeButton = popup.querySelector(".close");
    closeButton.addEventListener("click", () => {
      document.body.removeChild(popup);
    });
    // bill generation
    const closeBillButtons = popup.querySelectorAll(".bill");

    closeBillButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const tableBill = table.total;
        // Clear the items for the current table
        table.items = [];

        // Reset the order and total for the current table
        table.order = 0;
        table.total = 0;

        // Update the order and total display in the table block
        // const tableBlock = document.querySelector(`.block[data-table="${tableNum}"]`);
        const tableOrder = tableBlock.querySelector(".order");
        const tableTotal = tableBlock.querySelector(".total");
        tableOrder.textContent = "0";
        tableTotal.textContent = "0";

        // Clear the popup content
        const popup = document.querySelector(".popup");
        const popupContent = popup.querySelector(".popup-content");
        popupContent.innerHTML = "";
        popup.querySelector(".totalbill").textContent = "0";

        // Hide the popup
        popup.classList.remove("show");
        document.body.removeChild(popup);

        // Create a new popup to display the bill of the table
        const billPopup = document.createElement("div");
        billPopup.classList.add("popup");

        const billPopupContent = document.createElement("div");
        billPopupContent.classList.add("popup-content");

        const billText = `${table.name} bill: Rs.${tableBill}`;

        const billHeader = document.createElement("h2");
        billHeader.textContent = billText;
        billPopupContent.appendChild(billHeader);

        const closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.textContent = "Close";
        billPopupContent.appendChild(closeButton);

        billPopup.appendChild(billPopupContent);
        document.body.appendChild(billPopup);

        // Add event listener to the close button of the new popup
        closeButton.addEventListener("click", (event) => {
          document.body.removeChild(billPopup);
        });
      });
    });
  });
});

const searchFunMenu = () => {
  let filter = document.getElementById("search-bar-menu").value.toLowerCase();
  let data = menuSearch(filter, menuList);
  buildmenu(data);
};

function menuSearch(query, data) {
  let results = [];

  for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    let course = data[i].Course;
    let price = data[i].Price;

    if (
      name.toLowerCase().includes(query) ||
      course.toLowerCase().includes(query)
    ) {
      results.push({ name: name, Price: price });
    }
  }

  return results;
}

const searchFunTable = () => {
  let filter = document.getElementById("search-bar-table").value.toLowerCase();
  let data = tableSearch(filter, tableList);
  buildtable(data);
};
function tableSearch(query, data) {
  let results = [];

  for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    let cost = data[i].cost;
    let total = data[i].total;
    let order = data[i].order;

    if (name.toLowerCase().includes(query)) {
      results.push({ name: name, cost: cost, total: total, order: order });
    }
  }

  return results;
}

const menu = document.getElementById("content-menu");
const table = document.getElementById("content-table");

menu.addEventListener("dragstart", function (event) {
  const itemPrice = parseFloat(event.target.querySelector("span").textContent);
  event.dataTransfer.setData("text/plain", itemPrice);

  const itemName = event.target.querySelector("h2").textContent;

  const itemData = JSON.stringify({
    name: itemName,
    price: itemPrice,
  });

  event.dataTransfer.setData("application/json", itemData);
});

table.addEventListener("dragover", function (event) {
  event.preventDefault();
});

table.addEventListener("drop", function (event) {
  event.preventDefault();

  const itemData = JSON.parse(event.dataTransfer.getData("application/json"));
  const itemName = itemData.name;
  const itemPrice = parseFloat(itemData.price);

  const tableBlock = event.target.closest(".block");
  const tableIndex = parseInt(tableBlock.dataset.table);

  const tableOrder = tableBlock.querySelector(".order");
  const tableOrderCount = parseInt(tableOrder.textContent) || 0;
  const newTableOrderCount = tableOrderCount + 1;
  tableOrder.textContent = newTableOrderCount;

  const tableTotal = tableBlock.querySelector(".total");
  let tableTotalAmount = parseFloat(tableTotal.textContent) || 0;
  let newTableTotalAmount = tableTotalAmount;

  // check if the item is already present in the table
  const itemIndex = tableList[tableIndex - 1].items.findIndex(
    (item) => item.name === itemName
  );
  if (itemIndex !== -1) {
    const item = tableList[tableIndex - 1].items[itemIndex];
    item.quantity++;
    newTableTotalAmount += item.price;
  } else {
    // add new item to the table list
    tableList[tableIndex - 1].items.push({
      name: itemName,
      price: itemPrice,
      quantity: 1,
    });
    newTableTotalAmount += itemPrice;
  }

  tableList[tableIndex - 1].order = newTableOrderCount;
  tableList[tableIndex - 1].total = newTableTotalAmount.toFixed(2);
  tableTotal.textContent = newTableTotalAmount.toFixed(2);

  event.dataTransfer.setData(
    "application/json",
    JSON.stringify({ name: itemName, price: itemPrice })
  );
});