export default function (config) {
  console.log("Setup script..");
  console.log(config);

  function setupResultInfoBox() {
    console.log("setupResultInfoBox");
    const targetList = document.querySelectorAll(".h-portal-list");
    const configuration = {
      targetListElement: targetList,
      stringToQuery: "Ingen resultater",
      onClickRedirectUrl: "?contact-method=14515",
      searchKey: "searchkey",
      infoText:
        "Vær en ægte Telia helt og super-kollega, og lad os vide at der mangler en guide. Klik blot herunder:",
      buttonText: "Der mangler en guide!",
    };
    const extender = new AceCustomizer.SearchResultExtender(configuration);
    if (!extender.infoBoxExistsAlready()) {
      extender.createInfoBox();
    }
  }

  function convertLinksToIcons() {
    var isGuideShown = document.querySelector(".h-portal-guide.ng-scope");
    if (isGuideShown) {
      var contentArea = isGuideShown.querySelector("#internversion");
      var nodes = contentArea.childNodes;

      var container = document.createElement("div");
      container.className = "guide-special-options";
      contentArea.appendChild(container);

      function handler(iconClass, node, title) {
        var icon = document.createElement("i");
        icon.className = iconClass;
        node.title = title;

        var spanChild = node.querySelector("span");
        if (spanChild) {
          spanChild.innerText = "";
          spanChild.appendChild(icon);
        } else {
          //node.innerText = "";
          node.querySelector("a").innerText = "";
          node.querySelector("a").appendChild(icon);
        }

        return node;
      }

      nodes.forEach((node) => {
        try {
          if (node.innerText.includes("%eINFO%")) {
            container.appendChild(handler("fa fa-at", node, "e-INFO"));
          }
          if (node.innerText.includes("%camera%")) {
            container.appendChild(
              handler("fa fa-camera", node, "Gå til billede-guide")
            );
          }
        } catch (err) {}
      });
    }
  }

  function observationTrigger() {
    if (config.convertLinks) {
      convertLinksToIcons();
    }
    if (config.accordions) {
      // This should not run every time on the modal accordions, but only on the guides, or when modal accordion is not activated
      accordions.init();
    }
    if (config.resultInfoBox) {
      setupResultInfoBox();
    }
  }

  function returnBreadcrumbWhenAvailable() {
    console.log("returnBreadcrumbWhenAvailable");
    var node = document.querySelector(".breadcrumb");
    if (node) {
      return node;
    } else {
      return false;
    }
  }

  /**
   * Args: callback function and the evaluator, which is the function checking for the breadcrumb
   */
  const setupAttempter = new AceCustomizer.createAttemptFunc((targetNode) => {
    AceCustomizer.setupObserver(targetNode, observationTrigger);
  }, returnBreadcrumbWhenAvailable);

  setupAttempter();


}