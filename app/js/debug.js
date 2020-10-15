// Starting Debug App Container
function startDebugApp(){
    debugLogEvent('startDebugApp()');
    document.documentElement.innerHTML += debugAppHtml();
    loadCssStyle('debug-css', 'css/debug.min.css');
    
    appObject.debugConfirmed = true;
}


function debugLogEvent(message, type = null){
    console.log(message);
    if (appObject.debugConfirmed){
        document.getElementById('debugEventLog').innerHTML += singleDebugLogEventHTML(message);
        document.getElementById('debugJSONprint').innerHTML = JSON.stringify(appObject);
    }
}

function debugAppHtml(){ 
    return `<div id="debugContainer" class="debugContainer" style='max-height: 50vh;'>
                <div class="debugHeightChange"></div>
                <div id="debugContainerHeader">
                    <div class="titleDebug">
                        <h5>Debug Console</h5>
                    </div>
                    <div class="options">

                        <button class="debugToggleButton" onclick="toggleClassOnID('debugContainer', 'showDebugContainer')">Show/Hide Debug</button>
                    </div>
                </div>
                <div id="debugContainerContent">
                    <div id="debugEventLog"></div>
                    <div id="debugJSONprint"></div>
                </div>
                <div id="debugContainerFooter">

                </div>
            </div>`
}

function singleDebugLogEventHTML(message, type){
    if (type == null){
        type = '';
    }
    return `<div class='singleLogItem  `+type+`'>`+message+`</div>`;
}