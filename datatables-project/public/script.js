$(document).ready(function () {
  $("#userData").DataTable({
    ajax: {
      url: "http://localhost:3000/api/users",
      dataSrc: "data",
    },
    columns: [
      {
        data: null,
        title: "S.No.",
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "username" },
      { data: "email" },
      { data: "createdAt" },
      {
        data: "_id",
        render: function (data, type, row) {
          return `
            <button onClick="viewStudent('${data}')">View</button>
            <button onClick="updateStudent('${data}')">Update</button>
            <button onClick="updateStudent('${data}')">Delete</button>
            `;
        },
      },
    ],
    layout: {
      topStart: {
        buttons: ["excelHtml5", "csvHtml5", "pdfHtml5", "copyHtml5"],
      },
    },
  });
});
