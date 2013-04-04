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

var g_asteroidStrikeI = new AsteroidStrikeI();
g_asteroidStrikeI.Start();
//--------------------------------------------------------------------

function AsteroidStrikeI() {
    var m_space = new Space();
    var m_shell = new Shell();
    var m_canvas = null;
    var m_context = null;
    //--------------------------------------------------------------------
    this.Start = function () {
        m_canvas = m_shell.GetCanvas("cvsAsteroidStrikeI");
        if (m_canvas) {
            m_context = m_canvas.getContext("2d");
            if (m_context != null) {
                m_space.Init();
                setInterval(this.Frame, 16);
            }
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

    function Space() {
        var m_bgImg = null;
        var m_playerImg = null;
        var m_playerPosition = { x: 0, y: 0 };
        var m_playerRadius = 0;
        var m_playerOffset = 0;
        var m_asteroidImg = null;
        var m_asteroidList = [];
        var m_asteroidRadius = 0;
        var m_asteroidOffset = 0;
        //--------------------------------------------------------------------
        this.Init = function () {
            m_bgImg = new Image();
            GenStars(m_canvas, m_bgImg);

            m_playerImg = new Image();
            m_playerImg.src = "https://sites.google.com/site/ahewe95/sora_shooting_game/player.png";
            m_playerRadius = 16;
            m_playerOffset = -m_playerRadius;
            m_playerPosition.x = m_canvas.width / 2;
            m_playerPosition.y = m_canvas.height / 2;

            m_asteroidImg = new Image();
            m_asteroidImg.src = "https://sites.google.com/site/ahewe95/sora_shooting_game/asteroid.png";
            m_asteroidRadius = 16;
            m_asteroidOffset = -16;
        };
        //--------------------------------------------------------------------
        var counter = 0;
        this.Update = function () {
            if (m_shell.IsKeyPressed(INPUT.UP)) {
                this.MoveY(-g_shipSpeed);
            } else if (m_shell.IsKeyPressed(INPUT.DOWN)) {
                this.MoveY(g_shipSpeed);
            }
            if (m_shell.IsKeyPressed(INPUT.RIGHT)) {
                this.MoveX(g_shipSpeed);
            } else if (m_shell.IsKeyPressed(INPUT.LEFT)) {
                this.MoveX(-g_shipSpeed);
            }

            if (!counter) {
                var asteroid = { x: Rand(m_asteroidRadius, m_canvas.width - m_asteroidRadius), y: m_asteroidOffset };
                m_asteroidList.push(asteroid);
                counter = g_asteroidSpawnRate;
            } else {
                counter--;
            }
        };
        //--------------------------------------------------------------------
        this.Draw = function () {
            m_context.drawImage(m_bgImg, 0, 0);
            for (var i = m_asteroidList.length; i-- > 0;) {
                var asteroid = m_asteroidList[i];
                asteroid.y += g_asteroidSpeed;
                if (asteroid.y > m_canvas.height) {
                    m_asteroidList.splice(i, 1);
                } else if (CollideEntity(asteroid.x, asteroid.y, m_asteroidRadius, m_playerPosition.x, m_playerPosition.y, m_playerRadius)) {
                    m_asteroidList.splice(i, 1);
                } else {
                    m_context.setTransform(1, 0, 0, 1, asteroid.x, asteroid.y);
                    m_context.drawImage(m_asteroidImg, m_asteroidOffset, m_asteroidOffset);
                }
            }
            m_context.setTransform(1, 0, 0, 1, m_playerPosition.x, m_playerPosition.y);
            m_context.drawImage(m_playerImg, m_playerOffset, m_playerOffset);
        };
        //--------------------------------------------------------------------
        this.MoveX = function (move) {
            m_playerPosition.x += move;
            if (m_playerPosition.x > m_canvas.width + m_playerOffset) {
                m_playerPosition.x = m_canvas.width + m_playerOffset;
            } else if (m_playerPosition.x < m_playerRadius) {
                m_playerPosition.x = m_playerRadius;
            }
        };
        //--------------------------------------------------------------------
        this.MoveY = function (move) {
            m_playerPosition.y += move;
            if (m_playerPosition.y > m_canvas.height + m_playerOffset) {
                m_playerPosition.y = m_canvas.height + m_playerOffset;
            } else if (m_playerPosition.y < m_playerRadius) {
                m_playerPosition.y = m_playerRadius;
            }
        };
        //--------------------------------------------------------------------
    };
    //--------------------------------------------------------------------
};
//--------------------------------------------------------------------