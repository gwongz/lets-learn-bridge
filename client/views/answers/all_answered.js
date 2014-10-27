// Confetti canvas from http://codepen.io/linrock/pen/Amdhr

showConfetti = function(){
  NUM_CONFETTI = 350;
  COLORS = [[85,71,106], [174,61,99], [219,56,83], [244,92,68], [248,182,70]];
  PI_2 = 2*Math.PI;

  var canvas;

  canvas = document.getElementById('confetti');
  var context;

  context = canvas.getContext('2d');
  window.w = 0;
  window.h = 0;

  var resizeWindow;

  // make sure confetti does not exceed width of app layout
  


  resizeWindow = function() {
    console.log('resize window happening');
    var container = $('#main').css('width');
    console.log('container');
    console.log(container);
    if (container){
      container = parseFloat(container.replace('px', ''))
    } else {
      container = canvas.width;
    }

    window.w = canvas.width = window.innerWidth = container;
    window.h = canvas.height = window.innerHeight;
  // return window.h = canvas.height = window.innerHeight;
  };

  resizeWindow();


  window.addEventListener('resize', resizeWindow, false);


  var range;
  range = function(a, b) {
      return (b - a) * Math.random() + a;
  };

  var drawCircle;

  drawCircle = function(x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
  };

  var xpos = 0.5;

  document.onmousemove = function(e) {
      var xpos;
      return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
        };
    })();

  var Confetti;

  Confetti = (function() {
    function Confetti() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    Confetti.prototype.replace = function() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return this.vy = 0.7 * this.r + range(-1, 1);
    };

    Confetti.prototype.draw = function() {
      var _ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (_ref = this.x) && _ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.r, "" + this.rgb + "," + this.opacity + ")");
    };

    return Confetti;

  })();



  var confetti, i;

  confetti = (function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; 1 <= NUM_CONFETTI ? _i <= NUM_CONFETTI : _i >= NUM_CONFETTI; i = 1 <= NUM_CONFETTI ? ++_i : --_i) {
      _results.push(new Confetti);
    }
    return _results;
  })();

  step = function() {
    var c, _i, _len, _results;
    if (Session.get('confetti')){
      requestAnimationFrame(step);

      context.clearRect(0, 0, w, h);
      _results = [];
      for (_i = 0, _len = confetti.length; _i < _len; _i++) {
        c = confetti[_i];
        _results.push(c.draw());
      }
      return _results;
    }

  };

  step();

  // var stopConfetti = function(){
  //   console.log('stop confetti happening');
  //   Session.set('confetti', false);
  // };

  
};

stopConfetti = function(){
  console.log('stop confetti happening');
  Session.set('confetti', false);
};

Template.allAnswered.rendered = function() {
   // clear the Correct Answers collection so user can restart via reshuffle
   CorrectAnswers.remove({});
   console.log('showing confetti');
   Session.set('confetti', true);
   showConfetti();
   // window.onbeforeunload = stopConfetti;
};

Template.allAnswered.destroyed = function(){
  stopConfetti();
  console.log('this template was destroyed');
};
