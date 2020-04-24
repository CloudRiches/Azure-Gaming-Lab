$(function () {
    var score = 0,
        life = 100,
        timer = null,
        levelProfiles = [
            { level: 1, score: 0, moles: 1, interval: 1500 },
            { level: 2, score: 100, moles: 2, interval: 1500 },
            { level: 3, score: 200, moles: 2, interval: 1250 },
            { level: 4, score: 300, moles: 2, interval: 1000 },
            { level: 5, score: 500, moles: 3, interval: 1000 },
            { level: 6, score: 1000, moles: 3, interval: 750 },
        ];

    var $playground = $("#playground");


    $("#sizing").change(function () {
        var $this = $(this);
        createPlayground($this.val());
    });

    $("#start").click(function () {
        startGame();
    });

    $("#stop").click(function () {
        stopGame();
    });
    $('#history').click(function () {
        readData();
    });
    $('#clear').click(function () {
        clearData();
    });

    function createPlayground(edge) {
        $playground.empty();

        var $table = $("<table></table>"),
            counter = 0;

        for (var i = 0; i < edge; i++) {
            var $tr = $("<tr></<tr>");
            for (var j = 0; j < edge; j++) {
                var $td = $("<td></<td>")
                    .appendTo($tr);

                var $div = $("<div></div>")
                    .addClass("mole")
                    .appendTo($td);
            }
            $tr.appendTo($table);
        }
        $table
            .appendTo($playground)
            .css({
                marginTop: -1 * ($table.outerHeight() / 2),
                marginLeft: -1 * ($table.outerWidth() / 2)
            });
    }

    function startGame() {
        score = 0;
        life = 100;
        updateLife();
        clearTimeout(timer);
        nextMole();
    }

    function stopGame() {
        clearTimeout(timer);
        $(".mole.active").removeClass("active")
        $(".mole.hit").removeClass("hit")
        writeData();
        score = 0;
        life = 100;
        updateLife();
        updateScore();
    }

    function getLevelProfile() {
        var levelProfile = levelProfiles[0];

        for (var i = 0; i < levelProfiles.length; i++) {
            if (score >= levelProfiles[i].score) {
                levelProfile = levelProfiles[i];
            }
            else {
                break;
            }
        }
        return levelProfile;
    }

    function updateScore() {
        $("#current-score").text(score);
    }

    function updateLife() {
        $("#progress")
            .attr("aria-valuenow", life)
            .css("width", life + "%")
            .text(life);
    }

    function nextMole() {
        var $moles = $playground.find(".mole"),
            levelProfile = getLevelProfile();

        var active = $moles.filter(".active").length;
        var hit = $moles.filter(".hit").length;
        life -= Math.max(0, active - hit);
        updateLife();

        if (life <= 0) {
            stopGame();
            alert("GAME OVER!");
            return;
        }

        $moles.removeClass("active").removeClass("hit");

        $("#current-level").text(levelProfile.level);

        for (var i = 0; i < levelProfile.moles; i++) {
            var next = Math.floor(Math.random() * $moles.length);
            $moles.eq(next).addClass("active");
        }

        timer = setTimeout(nextMole, levelProfile.interval);
    }

    createPlayground(3);
    $('#playground').on('mouseup', '.mole', function (event) {
        var $this = $(this);
        if ($this.attr('class').indexOf('active') > 0) {
            $('#thevoice').remove();
            $('<audio></audio>')
                .attr('id', 'thevoice')
                .attr('src', '/images/5558.wav')
                .attr('autoplay', 'autoplay')
                .appendTo($('body'));
            score += 10;
            updateScore();

            $this
                .removeClass("active")
                .addClass("hit");
        }
    });
    function writeData() {
        var username = $('#username').val();
        $.ajax({
            url: "/api/WriteResult",
            type: "post",
            data: { username: username, score: score },
            success: function (result, status, xhr) {
                console.log(result);
            }
        });
    }
    function readData() {
        var username = $('#username').val();
        $.ajax({
            url: "/api/ReadResult",
            type: "post",
            data: { username: username },
            success: function (result, status, xhr) {
                var str = "";
                if (result.length != 0) {
                    $(result).each(function (i, item) {
                        str = str + item.score + "分" + "&nbsp&nbsp" + item.datetime + "<div class='theline'></div>";
                    });
                }
                else {
                    str = '無資料';
                }
                $('#thePanel').remove();
                var $body = $('body')
                var box = $('<div></div>')
                    .html(str)
                    .attr('id', 'thePanel')
                    .appendTo($body);
                $('<input>')
                    .attr('value', 'X')
                    .attr('type', 'button')
                    .attr('id', 'closeBtn')
                    .attr('onclick', "$('#thePanel').remove();")
                    .appendTo(box);
            }
        });
    }
    function clearData() {
        var username = $('#username').val();
        $.ajax({
            url: "/api/DeleteResult",
            type: "post",
            data: { username: username },
            success: function (result, status, xhr) {
                console.log(result);
            }
        });
    }
});