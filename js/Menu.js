class Menu {
  constructor(ctx) {
    this.ctx = ctx;

    this.bordersSides = document.querySelector("#borders-sides");
    this.bordersUpDown = document.querySelector("#borders-updown");

    this.container = document.querySelector(".container");
    // this.sliderDifficulty = document.querySelector(".difficulty");
    this.sliderSpeed = document.querySelector(".speed");
    this.endGame = document.querySelector(".end-game");

    this.canvas = document.querySelector("canvas");
  }

  show = () => {
    this.sliderSpeed.value = 20;
    this.endGame.style.display = "none";
    this.container.style.display = "block";
    this.displayBackground();
  };

  displayBackground() {
    this.smogOff();
    this.canvas.style.webkitFilter = "blur(5px)";
    this.ctx.filter = "blur(5px)";
    this.ctx.fillStyle = "rgba(33, 33, 33, 0.8)";
    this.ctx.fillRect(-10, -10, innerWidth + 20, innerHeight + 20);
    this.ctx.filter = "none";
  }

  hide() {
    this.canvas.style.webkitFilter = "none";
    this.smogOn();
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    this.container.style.display = "none";
  }

  getValues() {
    // var difficulty = this.sliderDifficulty.value;
    var speed = this.sliderSpeed.value;
    return {
      //   difficulty: difficulty,
      speed: speed,
    };
  }

  smogOn() {
    if (!this.bordersSides.classList.contains("borders-right-left")) {
      this.bordersSides.classList.toggle("borders-right-left");
    }
    if (!this.bordersUpDown.classList.contains("borders-up-down")) {
      this.bordersUpDown.classList.toggle("borders-up-down");
    }
  }

  smogOff() {
    if (this.bordersSides.classList.contains("borders-right-left")) {
      this.bordersSides.classList.toggle("borders-right-left");
    }
    if (this.bordersUpDown.classList.contains("borders-up-down")) {
      this.bordersUpDown.classList.toggle("borders-up-down");
    }
  }

  win() {
    this.endGame.style.display = "block";
    this.displayBackground();
  }
}
