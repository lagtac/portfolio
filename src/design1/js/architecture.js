/* Architecture diagram: swap the detail panel when a service is selected. */
(function () {
  "use strict";

  var panel = document.getElementById("arch-panel");
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-service]"));
  if (!panel || !triggers.length) return;

  var initial = panel.innerHTML;

  function select(trigger) {
    triggers.forEach(function (node) {
      node.setAttribute("aria-pressed", node === trigger ? "true" : "false");
    });

    var id = trigger.getAttribute("data-service");
    var template = document.getElementById("svc-" + id);

    if (!template) {
      panel.innerHTML = initial;
      return;
    }

    panel.replaceChildren(template.content.cloneNode(true));
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      select(trigger);
    });
  });
})();
