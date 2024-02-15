const PASSWORD = "TrustNo1";
let unlockButton = document.getElementById("unlock");
let password = document.getElementById("password");
let checkButtons = document.getElementsByClassName("check");
let rangeSliders = document.getElementsByClassName("vertical-slider");
let launchButton = document.getElementById("launch-btn");

unlockButton.addEventListener("click", function() {
    if (password.value == PASSWORD) {
        for (let i = 0; i < checkButtons.length; i++) {
            checkButtons[i].removeAttribute('disabled');
        }
        for (let i = 0; i < rangeSliders.length; i++) {
            rangeSliders[i].removeAttribute('disabled');
        }
        password.setAttribute('disabled', "");
        unlockButton.setAttribute('disabled', "");
    }
});

launchButton.addEventListener("click", function() {
    launchRocket();
});

for(let i = 0; i < checkButtons.length; i++) {
    checkButtons[i].onchange = function(){checkControls()};
}

for(let i = 0; i < rangeSliders.length; i++) {
    rangeSliders[i].onchange = function(){checkControls()};
}
function checkControls() {
    let checkCount = 0;
    let sliderCount = 0;

    for (let i = 0; i < checkButtons.length; i++) {
        if (checkButtons[i].checked == true) {
            checkCount++;
        }
    }
    for (let i = 0; i < rangeSliders.length; i++) {
        if (rangeSliders[i].value == 100) {
            sliderCount++;
        }
    }
    if (checkCount == 6 && sliderCount == 5) {
        launchButton.removeAttribute('disabled');
    }

}

async function launchRocket() {
    let rocket = document.getElementById("rocket");
    let rect = rocket.getBoundingClientRect();
    let x_rocket = Number(getComputedStyle(rocket).left.substr(0, getComputedStyle(rocket).left.length - 2));
    let y_rocket = Number(getComputedStyle(rocket).top.substr(0, getComputedStyle(rocket).top.length - 2));

    let animationComplete = false;
    let angle = 60;
    let speed = 200;

    //put the angle in radians
    let rads = angle * Math.PI / 180;

    //calculate the x and y components of the velocity in pixels per frame
    //speed is in pixels per second, so divide by 60 to get pixels per frame
    let vx = Math.cos(rads) * speed / 60;
    let vy = Math.sin(rads) * speed / 60;

    let interval = setInterval(function() {
        //calculate the new X and Y position
        x_rocket = x_rocket + vx;
        y_rocket = y_rocket - vy;

        rocket.style.left = x_rocket + "px";
        rocket.style.top = y_rocket + "px";

        if(y_rocket < -400) {
            clearInterval(interval);
        }

    }, 1000/60);

    launchButton.disabled = true;
}