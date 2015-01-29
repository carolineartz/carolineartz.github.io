window.onload = function() {

    /*Countdown*/

    var countdown = {
        createCountdown: function displayTime() {
            var clock = document.getElementById("clock"); // Find element with id="clock"
            var target_date = new Date("Mar 31, 2014").getTime();
            var now = new Date().getTime(); // Get current time
            var days, hours, minutes, seconds;

            var seconds_left = ((target_date - now) / 1000) + 22800; //assuming we start at 8 AM (added 8 hours)

            // time calculations
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;
            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;
            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);

            clock.innerHTML = "<span>" + days + "<span> days <\/span><\/span> <span>" + hours + "<span> hours <\/span><\/span> <span>" + minutes + "<span> minutes <\/span><\/span> <span>" + seconds + "<span> seconds<\/span><\/span>";
            setTimeout(displayTime, 1000); // Run again in 1 second
        }
    };

    countdown.createCountdown(); // Start displaying the time when document loads.


    var colorfulletters = {
        activate: function clickToggle() {
            document.getElementById("b_one").addEventListener('click', function() {

                if (document.getElementById("character_block").style.display !== 'block') {
                    document.getElementById("character_block").setAttribute("style", "display: block;");
                    document.getElementById("oscilating_block").setAttribute("style", "display: none;");
                } else {
                    document.getElementById("character_block").setAttribute("style", "display: none;");
                }
            });
        },
        hoverEffect: function colorMessage() {
            var colors = new Array('#7bd541', '#278fbb', '#33dc97', '#41c1b2', '#35abb6', '#434672');
            var targetEffect = document.getElementById("colorful");
            var parent = targetEffect.parentNode;
            var textString = targetEffect.innerHTML;
            var frag = document.createDocumentFragment();
            for (var i = 0; i < textString.length; i++) {
                var span = document.createElement("span");
                span.innerHTML = textString.charAt(i);
                frag.appendChild(span);
            }
            parent.replaceChild(frag, targetEffect);
            var letters = document.getElementById("colorful_heading").childNodes;
            for (var n = 0; n < letters.length; n++) {
                letters[n].onmouseover = function changeColor() {
                    this.style.color = colors[Math.floor(Math.random() * 6)];
                    return this;
                };
            }
        }
    };

    colorfulletters.activate();
    colorfulletters.hoverEffect();


    var oscilatingText = {
        activate: function clickToggle() {
            document.getElementById("b_two").addEventListener('click', function() {
                if (document.getElementById("oscilating_block").style.display !== 'block') {
                    document.getElementById("oscilating_block").setAttribute("style", "display: block;");
                    document.getElementById("character_block").setAttribute("style", "display: none;");
                } else {
                    document.getElementById("oscilating_block").setAttribute("style", "display: none;");
                }
            });
        },
        oscilateText: function oscilateText() {
            document.getElementById("move_right").addEventListener("mouseover", function() {
                this.setAttribute("style", "left:200px;");
                document.getElementById("move_left").setAttribute("style", "left:-200px;");
            });

            document.getElementById("move_right").addEventListener("mouseout", function() {
                this.setAttribute("style", "left:0;");
                document.getElementById("move_left").setAttribute("style", "left:0;");
            });

    }
};

    oscilatingText.activate();
    oscilatingText.oscilateText();

    var movingDot = {
        activate: function clickToggle() {
            document.getElementById("b_three").addEventListener('click', function() {
                var visibility = document.getElementById("moving_dot").style.visibility;
                if (visibility === 'visible') {
                    document.getElementById("moving_dot").setAttribute("style", "visibility: hidden");
                } else {
                    document.getElementById("moving_dot").setAttribute("style", "visibility: visible;");
                }
            });
        },
        moveDot: function moveDot() {
            document.addEventListener('click', function(move){
                document.getElementById('moving_dot').style.left = (move.clientX-25)+'px';
                document.getElementById('moving_dot').style.top = (move.clientY-25)+'px';
            });  
        }
    };

    movingDot.activate();
    movingDot.moveDot();




};