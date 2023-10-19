(function ($) {
  let color = "black";
  let seets = [];
  let mevent;
  let firststart = true;
  $myModal = function () {
    $overlay = $("<div></div>").appendTo("body");
    $overlay.prop("id", "myOverlay");

    $style = $(
      "<style>#myModal,#myModal #mySidebar div:nth-child(3){background:#fff}#myModal button,#myModal canvas,#myOverlay{position:absolute;top:0}#myOverlay{width:100%;height:100%;background:#0003;left:0;z-index:999999}#myModal{z-index:9999999;position:fixed;width:600px;height:600px;margin:auto;top:0;left:0;right:0;bottom:0}#myModal button{right:0;font-size:28px}#myModal #mySidebar{border:1px solid #000;width:30px;height:105px;padding:15px 0 0 5px}#myModal #mySidebar div{width:23px;height:23px;cursor:pointer;outline:#000 solid 2px;margin-bottom:8px}#myModal #mySidebar div:first-child{background:#000}#myModal #mySidebar div:nth-child(2){background:green}#myModal #mySidebar div.active{outline:#f00 solid 2px}#myModal canvas{background:#f0f0f0;left:37px}</style>"
    ).appendTo("body");

    $window = $("<div></div>").appendTo("body");
    $window.prop("id", "myModal");

    $sidebar = $("<div></div>").appendTo("#myModal");
    $sidebar.prop("id", "mySidebar");

    $mod1 = $("<div></div>").appendTo("#mySidebar");
    $mod2 = $("<div></div>").appendTo("#mySidebar");
    $del = $("<div></div>").appendTo("#mySidebar");

    $closeBtn = $("<button>x</button>").appendTo("#myModal");

    $closeBtn.on("click", function () {
      $myModal.Close();
    });

    $mod1.on("click", function () {
      $mod1.prop("class", "active");
      $mod2.prop("class", "");
      $del.prop("class", "");
      color = "black";
    });
    $mod1.prop("class", "active");
    $mod2.on("click", function () {
      $mod1.prop("class", "");
      $mod2.prop("class", "active");
      $del.prop("class", "");
      color = "green";
    });
    $del.on("click", function () {
      $mod1.prop("class", "");
      $mod2.prop("class", "");
      $del.prop("class", "active");
      color = "white";
    });

    $area = $('<canvas width="533" height="600"></canvas>').appendTo(
      "#myModal"
    );
    $area.on("click", function () {
      this.addEventListener("mousedown", function (e) {
        mevent = e;
      });
      let { x, y } = getMousePosition(this, mevent);
      if (color === "white") {
        seets = seets.filter((elem) => {
          return (
            elem[1] >= x + 25 ||
            elem[1] <= x - 25 ||
            elem[2] >= y + 25 ||
            elem[2] <= y - 25
          );
        });
        draw(this, true);
      } else {
        seets.push([color === "black" ? 1 : 0, x - 12, y - 12]);
        draw(this, false);
      }
    });
    $area.click();
    firststart = false;
    seets.splice(0, seets.length);
  };

  function getMousePosition(canvas, event) {
    if (!firststart) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      return { x, y };
    }
    return false;
  }

  function draw(canvas, clear) {
    const ctx = canvas.getContext("2d");
    if (clear) {
      clearing();
      filling();
    } else {
      filling();
    }
    function clearing() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function filling() {
      for (const item of seets) {
        ctx.fillStyle = item[0] ? "black" : "green";
        ctx.fillRect(item[1], item[2], 25, 25);
      }
    }
  }
  function showResults() {
    seets.map((el, i) => {
      const name = el[0] === 1 ? "black" : "green";
      const x = el[1];
      const y = el[2];
      console.log(`${i + 1} ${name} x=${x} y=${y}`);
    });
  }

  $myModal.Close = function () {
    $overlay.remove();
    $style.remove();
    $window.remove();
    if (seets.length > 0) {
      console.log("--------------RESULT--------------");
      showResults();
      console.log("--------------RESULT--------------");
    } else {
      console.log("no results");
    }
  };
})(jQuery);
