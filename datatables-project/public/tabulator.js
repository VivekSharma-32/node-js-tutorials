//Build Tabulator
var table = new Tabulator("#usersData", {
  height: "311px",
  layout: "fitColumns",

  ajaxURL: "http://localhost:3000/api/users",
  ajaxResponse: function (url, params, response) {
    return response.data;
  },
  progressiveLoad: "scroll",
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [10, 25, 50, 100],
  printAsHtml: true,
  printHeader: "<h1>Users Data<h1>",
  printFooter: "",
  placeholder: "No Data Set",
  columns: [
    { title: "Username", field: "username", headerFilter: "input" },

    { title: "Email", field: "email", headerFilter: "input" },

    { title: "Created At", field: "createdAt" },
    {
      title: "Actions",
      formatter: function (cell, formatterParams) {
        var id = cell.getRow().getData()._id;
        return `
            <button onClick="viewStudent('${id}')">View</button>
            <button onClick="updateStudent('${id}')">Update</button>
            <button onClick="deleteStudent('${id}')">Delete</button>
            `;
      },
    },
  ],
});

// Search
var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");

function updateFilter() {
  var filterVal = fieldEl.value;
  var typeVal = typeEl.value;
  var filter = valueEl.value;

  if (filterVal) {
    table.setFilter(filterVal, typeVal, filter);
  }
}

valueEl.addEventListener("keyup", updateFilter);

// Print Table
document.querySelector("#print-table").addEventListener("click", function () {
  table.print(false, true);
});

//trigger download of data.csv file
document.getElementById("download-csv").addEventListener("click", function () {
  table.download("csv", "data.csv");
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function () {
  table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function () {
  table.download("xlsx", "data.xlsx", { sheetName: "My Data" });
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function () {
  table.download("pdf", "data.pdf", {
    orientation: "portrait", //set page orientation to portrait
    title: "Example Report", //add title to report
  });
});

//trigger download of data.html file
document.getElementById("download-html").addEventListener("click", function () {
  table.download("html", "data.html", { style: true });
});
