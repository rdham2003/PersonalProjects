document.getElementById("submit").onclick = function() {
    document.getElementById("main_container").style.height = "35em"
    let loadElements = document.getElementsByClassName("load");
    for (let i = 0; i < loadElements.length; i++) {
        loadElements[i].style.visibility = 'visible';
    }
};
