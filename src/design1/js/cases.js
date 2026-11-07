/* Case table: filter by verdict, open the result screenshot. */
(function () {
  "use strict";

  var tbody = document.getElementById("case-rows");
  var status = document.getElementById("table-status");
  var filters = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  if (!tbody) return;

  var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr"));

  function apply(filter) {
    var shown = 0;

    rows.forEach(function (row) {
      var match = filter === "all" || row.getAttribute("data-verdict") === filter;
      row.hidden = !match;
      if (match) shown += 1;
    });

    filters.forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-filter") === filter ? "true" : "false");
    });

    if (status) {
      status.textContent = "Showing " + shown + " of " + rows.length + " cases.";
    }
  }

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      apply(button.getAttribute("data-filter"));
    });
  });

  tbody.addEventListener("click", function (event) {
    if (event.target.closest("button")) return;
    var row = event.target.closest("tr");
    if (!row) return;
    var trigger = row.querySelector(".case-table__rowbtn");
    if (trigger) trigger.click();
  });
})();
