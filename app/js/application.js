//
//  Application Name: Demo PageBuilder 
//  Description: Easy drag and drop pagebuilder. Hopefully visual editor in closer future.
//  Author: Slavko Vuletic
//
//
//  1. Application Object set
//  2. Pagebuilder starting function
//  3. Create App Container
//  
//  .
//  .
//  .
//  999. HELPERS FUNCTION SECTION
//          1. loadJavaScript(nameScript, scriptUrl, callBCK = null)    |> loading additional JS files
//          2. function loadCssStyle(nameStyle, styleURL)               |> loading additional CSS files


// 1. Application Object set 
var appObject = {
    'debug' : true,
    'viewMode'  : 'bloxBuilder',
};
//!! 1. Application Object set !!//


// 2. Pagebuilder starting function
function startPageBuilder(){

    // add some space to object
    appObject.pageFiles = [];
    
    // Check if debug active to load JS and start it
    if (appObject.debug){
        appObject.debugConfirmed = false;
        loadJavaScript('debug-js', 'js/debug.js', 'startDebugApp');
    }

    // call to start creating HTML content
    createApplicationContainer();

}
//!! 2. Pagebuilder starting function !!//

// 3. Create App Container
function createApplicationContainer(){
    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: createApplicationContainer()');
    }

    document.documentElement.innerHTML += appContainerHTML();
    
    loadCssStyle('application-css', 'css/application.min.css'); 
    loadCssStyle('inputs-css', 'css/inputs.min.css'); 
    loadCssStyle('modal-css', 'css/modal.min.css'); 
    loadCssStyle('theme_default-css', 'css/theme_default.min.css'); 
}
//!! 3. Create App Container !!//

// 4. Application Container HTML 
function appContainerHTML(){

    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: appContainerHTML()');
    }

    return  `<div id="applicationContainer">
                <div id="appHeader">
                    <div id="logoArea">
                        <p><{:|YEA|:}></p>
                    </div>
                    <div id="navigationArea">
                        <button onclick="createNewPageFileModal()">New Page</button>
                    </div>
                </div>
                <div id="appContent">


                    <div id="addNewSection">
                        <button onclick="addNewSection()">Add Section</button>
                    </div>
                </div>
                <div id="appFooter">
                    <div id="tabsFooter">
                    </div>
                    <div id="devCredits">
                        <p>MikiYEAAA</p>
                    </div>
                </div>
            </div>`
}
//!! 4. Application Container HTML !!//

// 5. Create New Page File
function createNewPageFile(elem){

    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: createNewPageFile()');
    }

    var pageNameHelper = document.getElementById('newFileName-val').value;

    if ((pageNameHelper == null) || (pageNameHelper == "")){
        if (appObject.debugConfirmed){
            debugLogEvent('Generating unique name for new PageFile');
        }
        pageNameHelper = 'page-'+generateRandomNumber();
    }

    var x;
    for (x in appObject.pageFiles){
        if (appObject.pageFiles[x].name == pageNameHelper){
            debugLogEvent('PageFile already exists!', 'warning');
            pageNameHelper += '-'+generateRandomNumber();
        }
    }

    appObject.pageFiles.push({'name': pageNameHelper,'slug': pageNameHelper,'seo_title': pageNameHelper, 'pageSections': []});

    appObject.fileSelected = (appObject.pageFiles.length - 1);

    closeModal(elem);
    drawPageViewContainer();
    updateFooterTabs();
}
//!! 5. Create New Page File  !!//

// 
function createNewPageFileModal(){

    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: createNewPageFileModal()');
    }

    if (document.getElementById('newPageFileModal') != null){
        document.getElementById('newPageFileModal').remove();
        
        if (appObject.debugConfirmed){
            debugLogEvent('Removing Existing newPageFileModal');
        }
    }
    
    if (appObject.debugConfirmed){
        debugLogEvent('Creating newPageFileModal');
    }

    document.getElementById('applicationContainer').innerHTML +=    `<div id='newPageFileModal' class="modalContainer">
                                                                        <div class="modalInner">
                                                                            <div class="modalHeader">
                                                                                <h4 class="modalTitle">New Page</h4>
                                                                                <button onclick="closeModal(this)">X</button>
                                                                            </div>
                                                                            <div class="modalContent">
                                                                                `+ printSingleOption('text','newFileName') +`
                                                                            </div>
                                                                            <div class="modalFooter">
                                                                                <button onclick="createNewPageFile(this)">Create</button>
                                                                                <button onclick="closeModal(this)">Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>`;
}
//!!

// 6. Add new section function 
function addNewSection(){

    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: addNewSection()');
    }

    appObject.pageFiles[appObject.fileSelected].pageSections.push({'name': 'sectionDemoName','background-color':'#444444', 'sectionRows': []});

    drawPageViewContainer();

}
//!! 6. Add new section function !!//

function drawPageViewContainer(){
    if (appObject.viewMode == 'bloxBuilder') {
        debugLogEvent('Drawing PageViewContainer!');
        drawBloxBuilderView();
    } else {
        debugLogEvent('Selected View Mode still not supported!', 'warning');
        appObject.viewMode = 'bloxBuilder';
        drawPageViewContainer();
    }
}

// drawBloxBuilderView
function drawBloxBuilderView(){
    if (document.getElementById('bloxBuilderView') == null){
        document.getElementById('appContent').innerHTML += "<div id='bloxBuilderView'></div>";
    }
    var helperBuilderVar = document.getElementById('bloxBuilderView');
    helperBuilderVar.innerHTML = "";
    var currentFile = appObject.pageFiles[appObject.fileSelected];
    var x, i;
    for (x in currentFile.pageSections) {
        //txt += currentFile.pageSections[x];

        helperBuilderVar.innerHTML +=      `<div class="sectionContainer" id="section-`+x+`">
                                                <div class="headerInfo">
                                                    <div class="title">
                                                        <h4>Section Name: `+currentFile.pageSections[x].name+`</h4>
                                                    </div>
                                                    <div class="options">
                                                        <button onclick="console.log(&quot;openSectionOptions&quot;);">O</button>
                                                        <button>X</button>
                                                    </div>
                                                </div>
                                                <div class="sectionInnerContent">
                                                </div>
                                                <div class="sectionInnerFooter">
                                                    <button class="addNewRow" onclick="addNewRowToSection(`+x+`)">Add Row</button>
                                                </div>
                                            </div>`;

        for(i in currentFile.pageSections[x].sectionRows){

            document.querySelector('#section-'+x+' .sectionInnerContent').innerHTML +=  `<div class="sectionContainer rowContainer" id="section-`+x+`-row-`+i+`">
                                                                                            <div class="headerInfo">
                                                                                                <div class="title">
                                                                                                    <h4>Row Name: `+currentFile.pageSections[x].sectionRows[i].name+`</h4>
                                                                                                </div>
                                                                                                <div class="options">
                                                                                                    <button onclick="console.log('openSectionOptions');">O</button>
                                                                                                    <button>X</button>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="sectionInnerContent">
                                                                                            
                                                                                            </div>
                                                                                            <div class="sectionInnerFooter">

                                                                                            </div>
                                                                                        </div>`;
        }

    }
     
}
//!!

// Add new row to section
function addNewRowToSection(x){
    appObject.pageFiles[appObject.fileSelected].pageSections[x].sectionRows.push({"name": "demoRowName", "structure": "full", 'columns': []})
    
    drawPageViewContainer();
}
//!!

//
function printSingleOption(type, name){
    if (type == 'text'){
        return  `<div class="singleOption" id="`+name+`">
                    <p>Name</p>
                    <div class="singleTextInput">
                        <input type='text' id='`+name+`-val' oninput='if (this.value != "") { document.getElementById("`+name+`-button").style.opacity = "1"; } else { document.getElementById("`+name+`-button").style.opacity = "0"; }'>
                        <button id='`+name+`-button' onclick='document.getElementById("`+name+`-val").value = ""; this.style.opacity = "0";' style='opacity: 0;'>X</button>
                    </div>
                </div>`
    }
}
//!!


// Footer Files Tabs
function updateFooterTabs(){
    document.getElementById('tabsFooter').innerHTML = "";
    var x;
    for (x in appObject.pageFiles){
        document.getElementById('tabsFooter').innerHTML += `<button>`+appObject.pageFiles[x].name+`</button>`;
    }
}
//!!

//  999. HELPERS FUNCTION SECTION
// Minor collection of helper functions
// Used to load rest of stuff when app started

    // 1. Load script helper 
    function loadJavaScript(nameScript, scriptUrl, callBCK = null){
        var script = document.createElement('script');
        script.setAttribute('id',nameScript);
        if (callBCK != null){
            script.onload = function () {
                //do stuff with the script
                eval(callBCK+'()');
            };
        }
        script.src = scriptUrl;

        document.head.appendChild(script);
    }
    //!! 1. Load script helper  !!//

    // 2. Load stylesheet css file
    function loadCssStyle(nameStyle, styleURL){
        var styleElem = document.createElement("link");   
        styleElem.type = 'text/css'; 
        styleElem.setAttribute("id", nameStyle);
        styleElem.rel = 'stylesheet';
        styleElem.href = styleURL;
        document.documentElement.appendChild(styleElem);    
    }
    //!! 2. Load stylesheet css file !!//

    // 3. Toggle ClassName on ID element
    function toggleClassOnID(elem_id, class_to_toggle){
        var helper = document.getElementById(elem_id);
        if (helper.innerHTML.length > 0) {
            helper.classList.toggle(class_to_toggle);
            debugLogEvent("Class ["+class_to_toggle+"] toggled find elem.id : "+elem_id+" ;")
        } else {
            debugLogEvent("Can't find elem.id : "+elem_id+" ;")
        }
    }
    //!! 3. Toggle ClassName on ID element !!//

    // 4. Close Modal
    function closeModal(elem){
        elem.closest('.modalContainer').remove();
    }
    //!!

    // 5. Generating Random Number 
    function generateRandomNumber(){
        return Math.floor((Math.random() * 1000000000) + 1);
    }
    //!! 


//!!  END 999. HELPERS FUNCTION SECTION END !!//


// Start app when doc ready
(function() {

    startPageBuilder();
 
 })();
 //!! Start app when doc ready