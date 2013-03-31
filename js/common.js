/*
    Copyright (C) 2009-2013 Ewe, YS (Sora)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var TWO_PI = 2 * Math.PI;
//--------------------------------------------------------------------

function Rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//--------------------------------------------------------------------

var keys = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    CTRL: 17,
};
//--------------------------------------------------------------------

var INPUT = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
    BTN_A: 4,
    BTN_B: 5,
};
//--------------------------------------------------------------------

function Shell() {
    var m_input = [0, 0, 0, 0, 0, 0];
    //--------------------------------------------------------------------
    this.GetCanvas = function (name) {
        canvas = document.getElementById(name);
        if (canvas) {
            canvas.addEventListener("keydown", this.KeyDown);
            canvas.addEventListener("keyup", this.KeyUp);
        }
        return canvas;
    };
    //--------------------------------------------------------------------
    this.IsKeyPressed = function (key) {
        return m_input[key];
    };
    //--------------------------------------------------------------------
    this.KeyUp = function (e) {
        switch (e.keyCode) {
            case keys.W:
            case keys.UP:
                m_input[INPUT.UP] = 0;
                break;

            case keys.S:
            case keys.DOWN:
                m_input[INPUT.DOWN] = 0;
                break;

            case keys.A:
            case keys.LEFT:
                m_input[INPUT.LEFT] = 0;
                break;

            case keys.D:
            case keys.RIGHT:
                m_input[INPUT.RIGHT] = 0;
                break;

            case keys.SPACE:
                m_input[INPUT.BTN_A] = 0;
                break;

            case keys.CTRL:
                m_input[INPUT.BTN_B] = 0;
                break;
        }
    };
    //--------------------------------------------------------------------
    this.KeyDown = function (e) {
        switch (e.keyCode) {
            case keys.W:
            case keys.UP:
                m_input[INPUT.UP] = 1;
                m_input[INPUT.DOWN] = 0;
                break;

            case keys.S:
            case keys.DOWN:
                m_input[INPUT.DOWN] = 1;
                m_input[INPUT.UP] = 0;
                break;

            case keys.A:
            case keys.LEFT:
                m_input[INPUT.LEFT] = 1;
                m_input[INPUT.RIGHT] = 0;
                break;

            case keys.D:
            case keys.RIGHT:
                m_input[INPUT.RIGHT] = 1;
                m_input[INPUT.LEFT] = 0;
                break;

            case keys.SPACE:
                m_input[INPUT.BTN_A] = 1;
                break;

            case keys.CTRL:
                m_input[INPUT.BTN_B] = 1;
                break;
        }
        e.preventDefault();
    };
    //--------------------------------------------------------------------
};
//--------------------------------------------------------------------

function DrawCircle(context, x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
};
//--------------------------------------------------------------------

function GenImageFromContext(context, img, width, height) {
    var imageData = context.getImageData(0, 0, width, height);

    var newCanvas = document.createElement("canvas");
    newCanvas.width = width;
    newCanvas.height = height;

    newCanvas.getContext("2d").putImageData(imageData, 0, 0);

    img.src = newCanvas.toDataURL();
};
//--------------------------------------------------------------------

function GenStars(canvas, img) {
    var width = canvas.width;
    var height = canvas.height;
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "white";
    var starDist = 32;
    for (var y = 0; y < height; y += starDist) {
        for (var x = 0; x < width; x += starDist) {
            context.fillRect(x + Rand(0, starDist), y + Rand(0, starDist), 1, 1);
        }
    }
    img.src = canvas.toDataURL();
    context.clearRect(0, 0, width, height);
};
//--------------------------------------------------------------------

var g_shipSpeed = 1;
function shipSpeedAction(select, canvas) {
    canvas.focus();
    g_shipSpeed = parseInt(select.value, 10);
}
//--------------------------------------------------------------------

var g_bulletSpeed = 2;
function bulletSpeedAction(select, canvas) {
    canvas.focus();
    g_bulletSpeed = parseInt(select.value, 10);
}
//--------------------------------------------------------------------

var g_autofireRate = 30;
function autofireAction(select, canvas) {
    canvas.focus();
    g_autofireRate = Math.floor(60 / parseInt(select.value, 10));
}
//--------------------------------------------------------------------

var g_turretShootRate = 30;
function turretShootAction(select, canvas) {
    canvas.focus();
    g_turretShootRate = parseInt(select.value, 10);
}
//--------------------------------------------------------------------

var g_wrapDistance = 100;
function wrapDistanceAction(select, canvas) {
    canvas.focus();
    g_wrapDistance = parseInt(select.value, 10);
}
//--------------------------------------------------------------------

var g_wrapRate = 30;
function wrapRateAction(select, canvas) {
    canvas.focus();
    g_wrapRate = parseInt(select.value, 10);
}
//--------------------------------------------------------------------

var g_maxCharge = 30;
function chargedBulletAction(select, canvas) {
    canvas.focus();
    g_maxCharge = parseInt(select.value, 10);
}
//--------------------------------------------------------------------

var g_minCharge = 15;
function chargedBulletMinAction(select, canvas) {
    canvas.focus();
    g_minCharge = parseInt(select.value, 10);
}
//--------------------------------------------------------------------

function SaveAsPNG(canvas) {
    var url = canvas.toDataURL("image/png");
    document.location.href = url.replace("image/png", "image/octet-stream");
}
//--------------------------------------------------------------------
