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

var g_shipMovementI = new ShipMovementI();
g_shipMovementI.Start();
//--------------------------------------------------------------------

function ShipMovementI() {
    var m_space = new Space();
    var m_canvas = null;
    var m_context = null;
    var m_speed = 1;
    //--------------------------------------------------------------------
    var input = {
        LEFT: 0,
        RIGHT: 0,
        UP: 0,
        DOWN: 0,
    };
    //--------------------------------------------------------------------
    this.Start = function () {
        var shell = new Shell();
        shell.Init();
        if (m_context != null) {
            setInterval(shell.Frame, 16);
        }
    };
    //--------------------------------------------------------------------
    this.SetSpeed = function (value) {
        m_speed = value;
    };
    //--------------------------------------------------------------------
    function Shell() {
        this.Init = function () {
            m_canvas = document.getElementById("cvsShipMovementI");
            if (m_canvas) {
                m_canvas.addEventListener("keydown", this.KeyDown);
                m_canvas.addEventListener("keyup", this.KeyUp);
                m_context = m_canvas.getContext("2d");
                m_space.Init();
            }
        };
        //--------------------------------------------------------------------
        this.Frame = function () {
            m_context.clearRect(0, 0, m_canvas.width, m_canvas.height);
            m_context.save();
            m_space.Update();
            m_space.Draw();
            m_context.restore();
        };
        //--------------------------------------------------------------------
        this.KeyUp = function (e) {
            switch (e.keyCode) {
                case keys.W:
                case keys.UP:
                    input.UP = 0;
                    break;

                case keys.S:
                case keys.DOWN:
                    input.DOWN = 0;
                    break;

                case keys.A:
                case keys.LEFT:
                    input.LEFT = 0;
                    break;

                case keys.D:
                case keys.RIGHT:
                    input.RIGHT = 0;
                    break;
            }
        };
        //--------------------------------------------------------------------
        this.KeyDown = function (e) {
            switch (e.keyCode) {
                case keys.W:
                case keys.UP:
                    input.UP = 1;
                    input.DOWN = 0;
                    break;

                case keys.S:
                case keys.DOWN:
                    input.DOWN = 1;
                    input.UP = 0;
                    break;

                case keys.A:
                case keys.LEFT:
                    input.LEFT = 1;
                    input.RIGHT = 0;
                    break;

                case keys.D:
                case keys.RIGHT:
                    input.RIGHT = 1;
                    input.LEFT = 0;
                    break;
            }
            e.preventDefault();
        };
        //--------------------------------------------------------------------
    };
    //--------------------------------------------------------------------

    function Space() {
        var m_bgImg = null;
        var m_playerImg = null;
        var m_playerPosition = { x: 0, y: 0 };
        var m_playerRadius = 0;
        //--------------------------------------------------------------------
        this.Init = function () {
            m_bgImg = new Image();
            GenStars(m_canvas, m_bgImg);

            m_playerImg = new Image();
            m_playerImg.src = "https://sites.google.com/site/ahewe95/sora_shooting_game/player.png";
            m_playerRadius = -16;
            m_playerPosition.x = m_canvas.width / 2;
            m_playerPosition.y = m_canvas.height / 2;
        };
        //--------------------------------------------------------------------
        this.Update = function () {
            if (input.UP) {
                m_playerPosition.y -= m_speed;
            } else if (input.DOWN) {
                m_playerPosition.y += m_speed;
            }
            if (input.RIGHT) {
                m_playerPosition.x += m_speed;
            } else if (input.LEFT) {
                m_playerPosition.x -= m_speed;
            }
        };
        //--------------------------------------------------------------------
        this.Draw = function () {
            m_context.drawImage(m_bgImg, 0, 0);
            m_context.setTransform(1, 0, 0, 1, m_playerPosition.x, m_playerPosition.y);
            m_context.drawImage(m_playerImg, m_playerRadius, m_playerRadius);
        };
        //--------------------------------------------------------------------
    };
    //--------------------------------------------------------------------
};
//--------------------------------------------------------------------