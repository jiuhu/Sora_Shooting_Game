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

var g_chargedShootII = new ChargedShootII();
g_chargedShootII.Start();
//--------------------------------------------------------------------

function ChargedShootII() {
    var m_space = new Space();
    var m_shell = new Shell();
    var m_canvas = null;
    var m_context = null;
    //--------------------------------------------------------------------
    this.Start = function () {
        m_canvas = m_shell.GetCanvas("cvsChargedShootII");
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
        var m_bulletList = [];
        var m_bulletSize = 0;
        var m_bulletOffset = 0;
        var m_minBulletSize = 0;
        var m_minBulletOffset = 0;
        var m_chargedBulletWidth = 0;
        var m_chargedBulletHeight = 0;
        var m_chargedBulletOffsetX = 0;
        var m_chargedBulletOffsetY = 0;
        var m_chargedStatus = 0;
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

            m_context.fillStyle = "red";
            m_bulletSize = 8;
            m_bulletOffset = -4;

            m_minBulletSize = 16;
            m_minBulletOffset = -8;

            m_chargedBulletWidth = 16;
            m_chargedBulletHeight = 32;
            m_chargedBulletOffsetX = -8;
            m_chargedBulletOffsetY = -32;
        };
        //--------------------------------------------------------------------
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
            var shoot = m_shell.IsKeyPressed(INPUT.BTN_A);
            if (shoot && m_chargedStatus < g_maxCharge) {
                m_chargedStatus++;
            } else if (!shoot && m_chargedStatus > 0) {
                this.Shoot();
                m_chargedStatus = 0;
            }
        };
        //--------------------------------------------------------------------
        this.Draw = function () {
            m_context.drawImage(m_bgImg, 0, 0);

            if (m_chargedStatus == g_maxCharge) {
                m_context.fillStyle = "blue";
            } else if (m_chargedStatus >= g_minCharge) {
                m_context.fillStyle = "green";
            } else {
                m_context.fillStyle = "red";
            }
            m_context.fillRect(0, 0, m_chargedStatus * 5, 16);

            for (var i = m_bulletList.length; i-- > 0;) {
                var bullet = m_bulletList[i];
                bullet.y -= g_bulletSpeed;
                if (bullet.y < 0) {
                    m_bulletList.splice(i, 1);
                } else {
                    m_context.setTransform(1, 0, 0, 1, bullet.x, bullet.y);
                    if (bullet.status < g_minCharge) {
                        m_context.fillStyle = "red";
                        m_context.fillRect(m_bulletOffset, m_bulletOffset, m_bulletSize, m_bulletSize);
                    } else if (bullet.status < g_maxCharge) {
                        m_context.fillStyle = "green";
                        m_context.fillRect(m_minBulletOffset, m_minBulletOffset, m_minBulletSize, m_minBulletSize);
                    } else {
                        m_context.fillStyle = "blue";
                        m_context.fillRect(m_chargedBulletOffsetX, m_chargedBulletOffsetY, m_chargedBulletWidth, m_chargedBulletHeight);
                    }
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
        this.Shoot = function () {
            var bullet = {
                x: m_playerPosition.x, y: m_playerPosition.y,
                status: m_chargedStatus
            };
            m_bulletList.push(bullet);
        };
        //--------------------------------------------------------------------
    };
    //--------------------------------------------------------------------
};
//--------------------------------------------------------------------