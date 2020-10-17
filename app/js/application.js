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
    'debug' : false,
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

    //load Additional Scripts
    loadJavaScript('drs_sidebar-js', 'js/drs_sidebar.js', 'startDraggableJS');

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
    loadCssStyle('theme_default-css', 'css/drs_sidebar.min.css'); 
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
                        <button onclick="createSidebarDragElements()">Add Elements</button>
                    </div>
                </div>
                <div id="appContent">


                    
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

    createDrsSidebar('newPageFileModal');


    document.querySelector('#newPageFileModal .con-header .con-title').innerHTML =    `Create New Page`;

    document.querySelector('#newPageFileModal .con-body').innerHTML +=  printSingleOption('text','newFileName');

    document.querySelector('#newPageFileModal .con-footer').innerHTML +=    `<button onclick="createNewPageFile(this)">Create</button>
                                                                             <button onclick="closeModal(this)">Cancel</button>`;
}
//!!

// 6. Add new section function 
function addNewSection(x = null){

    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: addNewSection()');
    }

    var currentFileSections = appObject.pageFiles[appObject.fileSelected].pageSections;

    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: addNewSection() => currentFileSections.length: '+ currentFileSections.length);
    }

    if(( x == null) || (x >= currentFileSections.length - 1)){
        if (appObject.debugConfirmed){
            debugLogEvent('Inside Func: addNewSection() => X: '+ x +` > currentFileSections.length `+ currentFileSections.length);
        }
        appObject.pageFiles[appObject.fileSelected].pageSections.push({'name': 'section'+generateRandomNumber(),'background-color':'#444444', 'sectionRows': []});
    } else {
        appObject.pageFiles[appObject.fileSelected].pageSections.splice(x+1, 0, {'name': 'section'+generateRandomNumber(),'background-color':'#444444', 'sectionRows': []});
    }


    clearPageBuilderHovering();

    drawPageViewContainer();
    
}
//!! 6. Add new section function !!//

function drawPageViewContainer(){
    if (appObject.viewMode == 'bloxBuilder') {
        if (appObject.debugConfirmed){
            debugLogEvent('Drawing PageViewContainer!');
        }
        drawBloxBuilderView();
    } else {
        if (appObject.debugConfirmed){
            debugLogEvent('Selected View Mode still not supported!', 'warning');
        }
        appObject.viewMode = 'bloxBuilder';
        drawPageViewContainer();
    }
}

// drawBloxBuilderView
function drawBloxBuilderView(){
    if (document.getElementById('bloxBuilderView') == null){
        document.getElementById('appContent').innerHTML += "<div id='bloxBuilderView'  onmouseenter='pageHoverStart(this)' onmouseleave='pageHoverEnd()' style='min-height: 100%; flex: 1;'></div>";
    }
    var helperBuilderVar = document.getElementById('bloxBuilderView');
    helperBuilderVar.innerHTML = "";
    var currentFile = appObject.pageFiles[appObject.fileSelected];
    var x, i;
    for (x in currentFile.pageSections) {
        //txt += currentFile.pageSections[x];

        helperBuilderVar.innerHTML +=      `<div class="sectionContainer" id="section-`+x+`" onmouseenter="sectionHoverStart(this)" onmouseleave="sectionHoverEnd()" sec-id="`+ x +`">
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
                                                </div>
                                            </div>`;

        if (appObject.debugConfirmed){
            debugLogEvent('Setion Length: ' + currentFile.pageSections[x].sectionRows.length );
        }

        for(i in currentFile.pageSections[x].sectionRows){

            document.querySelector('#section-'+x+' .sectionInnerContent').innerHTML +=  `<div class="sectionContainer rowContainer" id="section-`+x+`-row-`+i+`"  onmouseenter='rowHoverStart(this)' onmouseleave='rowHoverEnd(this)' row-id="`+ x +`&`+ i +`">
                                                                                            <div class="headerInfo">
                                                                                                <div class="title">
                                                                                                    <h4>Row Name: `+currentFile.pageSections[x].sectionRows[i].name+`</h4>
                                                                                                </div>
                                                                                                <div class="options">
                                                                                                    <button onclick="console.log('openSectionOptions');">O</button>
                                                                                                    <button>X</button>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="sectionInnerContent rowColumns">
                                                                                            
                                                                                            </div>
                                                                                            <div class="sectionInnerFooter">

                                                                                            </div>
                                                                                        </div>`;
            
            var helperString = currentFile.pageSections[x].sectionRows[i].type.split("_");
            var n = '';

            for (n = 0; n < helperString.length; n++){
                document.getElementById('section-'+x+'-row-'+i).querySelector('.sectionInnerContent .rowColumns').innerHTML += `<div class='singleColumn' column-id='`+n+`'   onmouseenter='columnHoverStart(this)' onmouseleave='columnHoverEnd(this)'>  </div>`;
                document.getElementById('section-'+x+'-row-'+i).querySelector('.sectionInnerContent .rowColumns').style.display = 'grid';
                document.getElementById('section-'+x+'-row-'+i).querySelector('.sectionInnerContent .rowColumns').style.gridTemplateColumns = 'calc( '+helperString.join(' * 100%) calc( ')+' * 100%)';
            };

            if (appObject.debugConfirmed){
                debugLogEvent('Row Length: ' + helperString.length + ' ; Row Structure:  '+ helperString);
            }

        }

    }
     
}
//!!

// Modal ew row  to section
function addNewRowToSectionModal(sectionID){
    
    if (appObject.debugConfirmed){
        debugLogEvent('Inside Func: addNewRowToSectionModal()');
    }

    if (document.getElementById('newRowModal') != null){
        document.getElementById('newRowModal').remove();
        
        if (appObject.debugConfirmed){
            debugLogEvent('Removing Existing newRowModal');
        }
    }
    
    if (appObject.debugConfirmed){
        debugLogEvent('Creating newRowModal');
    }

    createDrsSidebar('newRowModal');

    document.querySelector('#newRowModal .con-header .con-title').innerHTML =    `Add Row to Section`;

    document.querySelector('#newRowModal .con-body').innerHTML +=  printSingleOption('text','newRowName')+`<div class="singleOption" >
                                                                                                                <p>Name</p>
                                                                                                                <div class="options rowTypes">
                                                                                                                    <button onclick='addNewRowToSection(this)' value='1/1'>100%</button>
                                                                                                                    <button onclick='addNewRowToSection(this)' value='1/2_1/2'>50% : 50%</button>
                                                                                                                    <button onclick='addNewRowToSection(this)' value='1/3_1/3_1/3'>33% : 33% : 33%</button>
                                                                                                                    <button onclick='addNewRowToSection(this)' value='1/4_1/4_1/4_1/4'>25% :25% : 25% : 25%</button>
                                                                                                                    <button onclick='addNewRowToSection(this)' value='1/2_1/4_1/4'>50% : 25% : 25%</button>
                                                                                                                    <button onclick='addNewRowToSection(this)' value='1/4_1/2_1/4'>25% : 50% : 25%</button>
                                                                                                                    <button onclick='addNewRowToSection(this)' value='1/4_1/4_1/2'>25% : 25% : 50%</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <input id='sectionIdNum' type='text' value='`+sectionID+`' hidden>`;

    document.querySelector('#newRowModal .con-footer').innerHTML +=    `<button onclick="closeModal(this)">Cancel</button>`;

}
//!!

// Add new row to section
function addNewRowToSection(elem){

    if (appObject.debugConfirmed){
        debugLogEvent('Creating addNewRowToSection()');
    }


    var helperID = document.getElementById('sectionIdNum').value.split('&')[0];
    var helperIDrow = (parseInt(document.getElementById('sectionIdNum').value.split('&')[1]) + 1);
    var helperName = document.getElementById('newRowName-val').value;
    var currentFile = appObject.pageFiles[appObject.fileSelected].pageSections[helperID].sectionRows;
    
    if (appObject.debugConfirmed){
        debugLogEvent('SectionId: ' + helperID + ' ; RowId: '+helperIDrow);
    }

    if (helperName == ''){
        helperName = 'row-' + generateRandomNumber();
        if (appObject.debugConfirmed){
            debugLogEvent('Generated Row Name: ' + helperName);
        }
    }
    
    if (helperIDrow == currentFile.length ){
        if (appObject.debugConfirmed){
            debugLogEvent('Adding row to the end of section');
        }

        appObject.pageFiles[appObject.fileSelected].pageSections[helperID].sectionRows.push({"name": helperName, "type": elem.value, 'columns': []})

    } else {

        if (appObject.debugConfirmed){
            debugLogEvent('Inserting row into section at position: '+ helperIDrow );
        }

        appObject.pageFiles[appObject.fileSelected].pageSections[helperID].sectionRows.splice(helperIDrow , 0, {"name": helperName, "type": elem.value, 'columns': []});
        
    }
    
    drawPageViewContainer();
    clearPageBuilderHovering();
    closeModal(document.querySelector('#newRowModal .con-body'));
}
//!!

appObject.mouseHoverPage = false;
appObject.mouseHoverSec = false;
appObject.mouseHoverRow = false;
appObject.mouseHoverElem = false;

function clearPageBuilderHovering(){
    appObject.mouseHoverPage = false;
    appObject.mouseHoverSec = false;
    appObject.mouseHoverRow = false;
    appObject.mouseHoverElem = false;
}

// Hover on section, row or column
    function pageHoverStart(elem){
        if(!appObject.mouseHoverPage){
            if (appObject.debugConfirmed){
                debugLogEvent('Func: pageHoverStart()');
            }

            if(!appObject.mouseHoverPage){
                if (document.getElementById('bloxBuilderView').innerHTML.length == 0){
                    if (document.getElementById('addNewSection') != null){
                        document.getElementById('addNewSection').remove();   
                    };
            
        
                    document.getElementById('bloxBuilderView').innerHTML +=     `<div id="addNewSection">
                                                                                    <button onclick="addNewSection(`+elem.getAttribute('sec-id')+`)">Add Section</button>
                                                                                </div>`;
                }
            }
            
            appObject.mouseHoverPage = true;
        }
    }

    function pageHoverEnd(){
        if(!appObject.mouseHoverPage){
            if (appObject.debugConfirmed){
                debugLogEvent('Func: pageHoverEnd()');
            }
    
            if (document.getElementById('addNewSection') != null){
                document.getElementById('addNewSection').remove();   
            };

            clearPageBuilderHovering();
        }

    }

    function sectionHoverStart(elem){
        if (!appObject.mouseHoverSec){
            if (appObject.debugConfirmed){
                debugLogEvent('Func: sectionHoverStart()');
            }
            
            if (document.getElementById('addNewSectionAfterThis') != null){
                document.getElementById('addNewSectionAfterThis').remove();   
            };
    
            if (document.getElementById('addRowToSection') != null){
                document.getElementById('addRowToSection').remove();   
            };
    
            elem.innerHTML += `<button id='addNewSectionAfterThis' style='position:absolute; top: calc(100% - 15px); left: calc(50% - 75px); height: 30px; align-items: center; padding: 0px 15px; width: 125px; display: flex;' title='Add new section' onclick="addNewSection(`+elem.getAttribute('sec-id')+`)">Add Section</button>`
            if (elem.querySelector('.sectionInnerContent').childElementCount == 0   ){
                elem.innerHTML += `<button id='addRowToSection' style='position:absolute; top: calc(50% - 20px); left: calc(50% - 20px); height: 40px; width: 40px; font-size: 40px; justify-content: center; display: flex; align-items: center;' title='Add new row' onclick="addNewRowToSectionModal('`+elem.getAttribute('sec-id')+`')">+</button>`;
            }
            
            appObject.mouseHoverSec = true;
        }
    }

    function sectionHoverEnd(){

        if (appObject.debugConfirmed){
            debugLogEvent('Func: sectionHoverEnd()');
        }
        if ( document.getElementById('addNewSectionAfterThis') != null){
            document.getElementById('addNewSectionAfterThis').remove();   
        }
        if ( document.getElementById('addRowToSection') != null){
            document.getElementById('addRowToSection').remove();   
        }
        
        clearPageBuilderHovering();
    }

    function rowHoverStart(elem){

        if (appObject.debugConfirmed){
            debugLogEvent('Func: rowHoverStart()');
        }

        if (!appObject.mouseHoverRow) {
            if (appObject.debugConfirmed){
                debugLogEvent(`addNewRowToSectionModal('`+ elem.getAttribute('row-id') +`')`);
            }
            elem.innerHTML += `<button id='addNewRowAfterThis' style='position:absolute; top: calc(100% - 15px); height: 30px; align-items: center; left: calc(50% - 75px); padding: 5px 12.5px; width: 125px; display: flex;' onclick="addNewRowToSectionModal('`+ elem.getAttribute('row-id') +`')">Add Row</button>`;
            appObject.mouseHoverRow = true;
        }
    }

    function rowHoverEnd(elem){

        if (appObject.debugConfirmed){
            debugLogEvent('Func: rowHoverEnd()');
        }

        if ( document.getElementById('addNewRowAfterThis') != null){
            document.getElementById('addNewRowAfterThis').remove();   
        }
        
        clearPageBuilderHovering();
    }

    function columnHoverStart(elem){

        if (appObject.debugConfirmed){
            debugLogEvent('Func: columnHoverStart()');
        }

        if (!appObject.mouseHoverElem) {
            elem.innerHTML += `<button id='addNewElementToColumnButton' style='position:absolute; top: calc(100% - 15px); height: 30px; align-items: center; left: calc(50% - 75px); padding: 5px 12.5px; width: 125px; display: flex;'>Add Element</button>`;
            appObject.mouseHoverElem = true;
        }
    }

    function columnHoverEnd(elem){

        if (appObject.debugConfirmed){
            debugLogEvent('Func: columnHoverEnd()');
        }

        if ( document.getElementById('addNewElementToColumnButton') != null){
            document.getElementById('addNewElementToColumnButton').remove();   
        }

        clearPageBuilderHovering();
    }
// Hover on section, row or column



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
        document.getElementById('tabsFooter').innerHTML += `<button page-id='`+x+`' onclick='changeSelectedPage(this)'>`+appObject.pageFiles[x].name+`</button>`;
    }
}
//!!

function changeSelectedPage(elem){

    if (appObject.debugConfirmed){
        debugLogEvent('Func: changeSelectedPage()');
    }

    if (appObject.debugConfirmed){
        debugLogEvent('Old selected: '+ appObject.fileSelected );
    }

    appObject.fileSelected = elem.getAttribute('page-id');

    if (appObject.debugConfirmed){
        debugLogEvent('New selected: '+ appObject.fileSelected );
    }

    clearPageBuilderHovering();
    drawPageViewContainer();
    updateFooterTabs();
}


function createSidebarDragElements(){
    
    createDrsSidebar('dragElementsSidebar');

    document.querySelector('#dragElementsSidebar .con-header .con-title').innerHTML =    `Drag Elements Into Page`;

    document.querySelector('#dragElementsSidebar .con-body').innerHTML +=  printSingleOption('text','newRowName')+`<div class="singleOption listOfElements" >
                                                                                                                <p>Elements</p>
                                                                                                                <div class="options">
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                    <div class="singleElem">
                                                                                                                        <p class="title">Demo Title</p>
                                                                                                                        <p class="subtext">Some random text to show up filling in the space</p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>`;

    document.querySelector('#dragElementsSidebar .con-footer').innerHTML +=    `<button onclick="closeModal(this)">Cancel</button>`;
}
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
        elem.closest('.containerDrsSidebar').remove();
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