import { levels } from "./level.mjs";
var BoxOpened = "", ImgOpened = "",  Counter = 0, ImgFound = 0, Source = "#boxcard", CurrentOpened = "";
var ImgSource = [
    "http://img5.uploadhouse.com/fileuploads/17699/176992640c06707c66a5c0b08a2549c69745dc2c.png",
    "http://img6.uploadhouse.com/fileuploads/17699/17699263b01721074bf094aa3bc695aa19c8d573.png",
    "http://img6.uploadhouse.com/fileuploads/17699/17699262833250fa3063b708c41042005fda437d.png",
    "http://img9.uploadhouse.com/fileuploads/17699/176992615db99bb0fd652a2e6041388b2839a634.png",
    "http://img4.uploadhouse.com/fileuploads/17699/176992601ca0f28ba4a8f7b41f99ee026d7aaed8.png",
    "http://img3.uploadhouse.com/fileuploads/17699/17699259cb2d70c6882adc285ab8d519658b5dd7.png",
    "http://img2.uploadhouse.com/fileuploads/17699/1769925824ea93cbb77ba9e95c1a4cec7f89b80c.png",
    "http://img7.uploadhouse.com/fileuploads/17699/1769925708af4fb3c954b1d856da1f4d4dcd548a.png",
    "http://img9.uploadhouse.com/fileuploads/17699/176992568b759acd78f7cbe98b6e4a7baa90e717.png",
    "http://img9.uploadhouse.com/fileuploads/17699/176992554c2ca340cc2ea8c0606ecd320824756e.png"
];

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function ShuffleImages() {
    var ImgAll = $(Source).children();
    var ImgThis = $(Source + " div:first-child");
    var ImgArr = new Array();

    for (var i = 0; i < ImgAll.length; i++) {
        ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
        ImgThis = ImgThis.next();
    }

    ImgThis = $(Source + " div:first-child");

    for (var z = 0; z < ImgAll.length; z++) {
        var RandomNumber = RandomFunction(0, ImgArr.length - 1);

        $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
    }
}

function ResetGame() {
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    return false;
}

const sound = new Audio("../sounds/mixkit-animated-small-group-applause-523.wav")
function OpenCard() {
    var id = $(this).attr("id");
    if ($("#" + id + " img").is(":hidden")) {
        $(Source + " div").unbind("click", OpenCard);
        $("#" + id + " img").slideDown('fast');
        if (ImgOpened == "") {
            BoxOpened = id;
            ImgOpened = $("#" + id + " img").attr("src");
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 300);
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (ImgOpened != CurrentOpened) {
                setTimeout(function () {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + BoxOpened + " img").slideUp('fast');
                    BoxOpened = "";
                    ImgOpened = "";
                }, 400);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
                ImgFound++;
                BoxOpened = "";
                ImgOpened = "";
            }
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 400);
        }
        Counter++;
        $("#counter").html("" + Counter);
        if (ImgFound == ImgSource.length) {
            console.log("bravo")
            levels(Counter)
                    $("#counter").prepend('<span id="success"> <img src="../images/gif/Animation - 1714291205639.gif" alt="guide avatar" class="max-w-xs absolute h-screen hover:origin-center  md:max-w-sm m-auto transition duration-300 myimg" /> Bravo tu as reussi à trouver tous les images en </span>');
                    sound.play()
                    setTimeout(() => {
                        // window.location.href='/home/massar/HackathonHackEdu/static/templates/feli1.html';
                        window.location.replace("http://127.0.0.1:5501/static/templates/feli1.html");
                    },3000)
        }
    }
}

$(function () {
    for (var y = 1; y < 3; y++) {
        $.each(ImgSource, function (i, val) {
            $(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
        });
    }
    $(Source + " div").click(OpenCard);
    ShuffleImages();
});