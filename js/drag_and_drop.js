var draggingType = null;

//Functions for 

function allowDropElem(ev) {
    ev.preventDefault();
    ev.target.style.background = 'green';
}

function allowLeaveElem(ev) {
    ev.preventDefault();
    ev.target.style.background = '';
}

function dragElem(ev) {
    ev.stopPropagation();
    ev.dataTransfer.setData("text", ev.target.id);
    draggingType = 'elem';
}

function dragElemSidebar(ev) {
    ev.stopPropagation();
    ev.dataTransfer.setData("text", ev.target.id);
    draggingType = 'elemSide';
}

function dropElem(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (draggingType == 'elem'){
        ev.target.closest('.innerColumnContent').appendChild(document.getElementById(data));
    } else if (draggingType == 'elemSide'){
        ev.target.closest('.innerColumnContent').appendChild(document.getElementById(data).cloneNode(true));
    } else {
        ev.target.closest('.innerRowContent').appendChild(document.getElementById(data));
    }
    ev.target.style.background = '';
    draggingType = null;
}



function allowDropColumn(ev) {
    ev.preventDefault();
    ev.target.style.background = 'green';
}

function allowLeaveColumn(ev) {
    ev.preventDefault();
    ev.target.style.background = '';
}

function dragColumn(ev) {
    ev.stopPropagation();
    ev.dataTransfer.setData("text", ev.target.id);
    draggingType = 'column';
}

function dropColumn(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (draggingType == 'elem'){
        ev.target.closest('.innerColumnContent').appendChild(document.getElementById(data));
    } else {
        ev.target.closest('.innerRowContent').appendChild(document.getElementById(data));
    }
    ev.target.style.background = '';
    draggingType = null;
}

