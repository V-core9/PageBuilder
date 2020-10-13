function allowDropElem(ev) {
    ev.preventDefault();
    ev.target.style.background = 'green';
}

function allowLeaveElem(ev) {
    ev.preventDefault();
    ev.target.style.background = 'transparent';
}

function dragElem(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropElem(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.closest('.innerColumnContent').appendChild(document.getElementById(data));
    ev.target.style.background = 'transparent';
}

