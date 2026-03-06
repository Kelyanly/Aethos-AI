(function bootstrapDin0() {
  if (window.Din0) return;

  function createStyle() {
    if (document.getElementById("din0-widget-style")) return;
    var style = document.createElement("style");
    style.id = "din0-widget-style";
    style.textContent =
      ".din0-widget-root{position:fixed;z-index:9999;font-family:Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}" +
      ".din0-widget-root.bottom-right{right:16px;bottom:16px}" +
      ".din0-widget-root.bottom-left{left:16px;bottom:16px}" +
      ".din0-widget-button{width:52px;height:52px;border-radius:999px;border:1px solid rgba(0,0,0,.14);background:#0f1720;color:#fff;cursor:pointer;box-shadow:0 12px 22px rgba(0,0,0,.2)}" +
      ".din0-widget-panel{width:min(340px,calc(100vw - 24px));margin-top:10px;border-radius:14px;border:1px solid rgba(0,0,0,.12);background:#fff;box-shadow:0 20px 36px rgba(0,0,0,.18);overflow:hidden}" +
      ".din0-widget-header{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.08)}" +
      ".din0-widget-title{font-size:14px;font-weight:700;color:#0f1720}" +
      ".din0-widget-close{border:1px solid rgba(0,0,0,.14);background:#fff;border-radius:999px;padding:4px 8px;cursor:pointer;font-size:11px}" +
      ".din0-widget-body{display:grid;gap:8px;padding:12px}" +
      ".din0-widget-message{font-size:13px;color:#1f2937;line-height:1.45;background:#f6f8f7;border:1px solid rgba(0,0,0,.07);padding:10px;border-radius:10px}" +
      ".din0-widget-actions{display:flex;gap:6px;flex-wrap:wrap}" +
      ".din0-widget-action{border:1px solid rgba(0,0,0,.16);background:#fff;border-radius:999px;padding:6px 10px;cursor:pointer;font-size:12px;color:#0f1720}" +
      ".din0-widget-action:hover{border-color:#1f6b4f;background:rgba(31,107,79,.06)}" +
      "@media (max-width:760px){.din0-widget-root.bottom-right,.din0-widget-root.bottom-left{right:10px;left:auto;bottom:10px}}";
    document.head.appendChild(style);
  }

  function requestMessage(apiBaseUrl, prompt) {
    if (!apiBaseUrl) {
      return Promise.resolve("Din_0: Add apiBaseUrl to enable contextual backend responses.");
    }

    return fetch(apiBaseUrl.replace(/\/$/, "") + "/api/din0/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPage: window.location.pathname,
        section: "embed_widget",
        userAction: "ask_question",
        userMessage: prompt,
      }),
    })
      .then(function (response) {
        if (!response.ok) throw new Error("request_failed");
        return response.json();
      })
      .then(function (data) {
        return (data && data.message) || "Din_0: Request completed.";
      })
      .catch(function () {
        return "Din_0: I can guide you to demos, ROI calculator, or consultation.";
      });
  }

  window.Din0 = {
    init: function init(config) {
      var options = config || {};
      var root = document.getElementById("din0-widget-root");
      if (root) root.remove();

      createStyle();

      root = document.createElement("div");
      root.id = "din0-widget-root";
      root.className = "din0-widget-root " + (options.position === "bottom-left" ? "bottom-left" : "bottom-right");

      var button = document.createElement("button");
      button.type = "button";
      button.className = "din0-widget-button";
      button.setAttribute("aria-label", "Open Din_0 assistant");
      button.textContent = "Din";

      var panel = document.createElement("div");
      panel.className = "din0-widget-panel";
      panel.hidden = true;

      var header = document.createElement("div");
      header.className = "din0-widget-header";

      var title = document.createElement("p");
      title.className = "din0-widget-title";
      title.textContent = options.title || "Din_0 Assistant";

      var close = document.createElement("button");
      close.type = "button";
      close.className = "din0-widget-close";
      close.textContent = "Close";

      var body = document.createElement("div");
      body.className = "din0-widget-body";

      var message = document.createElement("div");
      message.className = "din0-widget-message";
      message.textContent = "Din_0: Ask me where to start with AI opportunities.";

      var actions = document.createElement("div");
      actions.className = "din0-widget-actions";

      (options.quickActions || ["Demo", "ROI", "Consultation"]).forEach(function (label) {
        var action = document.createElement("button");
        action.type = "button";
        action.className = "din0-widget-action";
        action.textContent = label;
        action.addEventListener("click", function () {
          message.textContent = "Din_0: Thinking...";
          requestMessage(options.apiBaseUrl, label).then(function (text) {
            message.textContent = text;
          });
        });
        actions.appendChild(action);
      });

      button.addEventListener("click", function () {
        panel.hidden = !panel.hidden;
        window.dispatchEvent(new Event(panel.hidden ? "din0:close" : "din0:open"));
      });

      close.addEventListener("click", function () {
        panel.hidden = true;
        window.dispatchEvent(new Event("din0:close"));
      });

      header.appendChild(title);
      header.appendChild(close);
      body.appendChild(message);
      body.appendChild(actions);
      panel.appendChild(header);
      panel.appendChild(body);

      root.appendChild(button);
      root.appendChild(panel);
      document.body.appendChild(root);
    },
  };
})();
