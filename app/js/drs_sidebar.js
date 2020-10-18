// DRAG/RESIZE/SNAP JS

/*
var appObject = {
    "debug" : true,
  };
*/
  
  function startDraggableJS(){
    
    if (appObject.debug){
      console.log('Entering -> startDraggableJS()');
    }
    //Define some variables
    appObject.drag = {};
    
    //Add event listeners
    addOnStartEventListeners();
    
    if (appObject.debug){
      console.log('Leaving -> startDraggableJS()');
    }
  }
  
  function addOnStartEventListeners(){
    
    if (appObject.debug){
      console.log('Entering -> addOnStartEventListeners()');
    }
    
    window.addEventListener("mousedown", windowMouseDown);
    window.addEventListener("mousemove", windowMouseMove);
    window.addEventListener("mouseup", windowMouseUp);
    
    if (appObject.debug){
      console.log('Leaving -> addOnStartEventListeners()');
    }
  }
  
  function removeOnEndEventListeners(){
    
    if (appObject.debug){
      console.log('Entering -> removeOnEndEventListeners()');
    }
    
    window.removeEventListener("onmousedown", windowMouseDown());
    window.removeEventListener("onmousemove", windowMouseMove());
    window.removeEventListener("onmouseup", windowMouseUp());
    
    if (appObject.debug){
      console.log('Leaving -> removeOnEndEventListeners()');
    }
  }
  
  function windowMouseDown(e){
    
    if (appObject.debug){
      console.log('Entering -> windowMouseDown()');
    }
    
    if (e.target.closest('.dragHandleJS') && (e.target.tagName != 'BUTTON')){
      
      if (appObject.debug){
        console.log('Click on dragHandleJS');
      }
      
      appObject.dragContainer = e.target.closest('.draggableJS');
      
      if (appObject.debug){
        if (appObject.dragContainer != null){
          console.log('appObject.dragContainer not empty');
        }
        if(appObject.dragContainer.classList.contains('snappedToRight') || appObject.dragContainer.classList.contains('snappedToLeft')){
          appObject.dragContainer.classList.remove('snappedToRight');
          appObject.dragContainer.classList.remove('snappedToLeft');
          appObject.dragContainer.style.height = '80%';
          document.getElementById('applicationContainer').style.width = '100%';
          document.getElementById('applicationContainer').style.paddingLeft = '0';
          document.getElementById('applicationContainer').style.paddingRight = '0';

        }
      }
      
      appObject.dragStatus = true;
      appObject.dragType = 'drag';
      
      appObject.drag.startX = e.clientX;
      appObject.drag.startY = e.clientY;
      
      appObject.drag.elStartX = appObject.dragContainer.offsetLeft;
      appObject.drag.elStartY = appObject.dragContainer.offsetTop;
      
      if(document.querySelector('.resizeHandleJS')){
        document.querySelector('.resizeHandleJS').remove();
      }
      
    }
    
    if (e.target.classList.contains('resizeHandleJS')){
      
      if (appObject.debug){
        console.log('Click on dragHandleJS resizeHandleJS');
      }
      
      appObject.dragContainer = e.target.closest('.draggableJS');
      
      if (appObject.debug){
        if (appObject.dragContainer != null){
          console.log('appObject.dragContainer not empty');
        }
      }
      
      appObject.dragStatus = true;
      appObject.dragType = 'resize';
      
      appObject.drag.startX = e.clientX;
      appObject.drag.startY = e.clientY;
      
      appObject.drag.elStartX = appObject.dragContainer.offsetLeft;
      appObject.drag.elStartY = appObject.dragContainer.offsetTop;
      appObject.drag.elStartW = appObject.dragContainer.offsetWidth;
      appObject.drag.elStartH = appObject.dragContainer.offsetHeight;
      
      
    }
  }
  
  function windowMouseMove(e){
    
    if (appObject.debug){
      console.log('Entering -> windowMouseMove()');
    }
    
    if (appObject.dragStatus){
      
      if (appObject.debug){
        console.log('appObject.dragStatus -> TRUE');
      }
      
      appObject.drag.nowX = e.clientX;
      appObject.drag.nowY = e.clientY;
      
      updateView();
      
    } else {
      
      if (appObject.debug){
        console.log('appObject.dragStatus -> FALSE');
      } 
      
      var helperResJS = e.target.closest('.resizableJS');
      
      if (helperResJS){
      
        if (appObject.debug){
          console.log('resizableJS element -> TRUE');
        }
        
        if (!appObject.hoverResize){
          if (document.querySelector('.resizeHandleJS')){
            document.querySelector('.resizeHandleJS').remove();
          }
          helperResJS.innerHTML += '<div class="resizeHandleJS" style="position: absolute; top: calc(100% - 15px); left: calc(100% - 15px); border-radius: 50%; box-shadow: 0 2px 3px gray; width: 30px; height: 30px; background: gray; color:white; font-weight: 800; display: flex; align-items: center; justify-content: center; cursor: re-size;"><span style="pointer-events: none; transform: rotate(45deg);"><><span></div>';
          appObject.hoverResize = true;
          if(helperResJS.classList.contains('snappedToRight')){
            document.querySelector('.resizeHandleJS').style.left = '-2.5px';
            document.querySelector('.resizeHandleJS').style.top = '0px';
            document.querySelector('.resizeHandleJS').style.height = '100%';
            document.querySelector('.resizeHandleJS').style.width = '5px';
            document.querySelector('.resizeHandleJS').style.borderRadius = '0';
            document.querySelector('.resizeHandleJS').innerHTML = '<div class="resizeHandleJS" style="padding:0.15em; background: gray; border-radius: 50%;"><></div>';
          }
          if(helperResJS.classList.contains('snappedToLeft')){
            document.querySelector('.resizeHandleJS').style.left = 'calc(100% - 2.5px)';
            document.querySelector('.resizeHandleJS').style.top = '0px';
            document.querySelector('.resizeHandleJS').style.height = '100%';
            document.querySelector('.resizeHandleJS').style.width = '5px';
            document.querySelector('.resizeHandleJS').style.borderRadius = '0';
            document.querySelector('.resizeHandleJS').innerHTML = '<div class="resizeHandleJS" style="padding:0.15em; background: gray; border-radius: 50%;"><></div>';
          }
        } 
      } else {
          appObject.hoverResize = false;
          if (document.querySelector('.resizeHandleJS')){
            document.querySelector('.resizeHandleJS').remove();
        }
      }
    }
    
    if (appObject.debug){
      console.log('Leaving -> windowMouseMove()');
    }
    
  }
  
  function windowMouseUp(e){
    
    if (appObject.debug){
      console.log('Entering -> windowMouseUp()');
    }
    
    if (appObject.dragStatus){
      if((appObject.dragType == 'drag') && appObject.dragContainer.classList.contains('resizableJS')){
        if (appObject.dragContainer.classList.contains('snappableJS') && (appObject.drag.nowX < 20)){
          snapLeftSide(appObject.dragContainer);
          document.querySelector('.snapClone').remove();
        }
        
        if(appObject.dragContainer.classList.contains('snappableJS') && (appObject.drag.nowX > (screen.width - 20))){
          snapRightSide(appObject.dragContainer);
          document.querySelector('.snapClone').remove();
        }
      }
      appObject.dragStatus = false;
      appObject.hoverResize = false;
      appObject.dragType = '';

      if (appObject.drs_data == null){
          appObject.drs_data = {};
      }
      appObject.drs_data.topPos = appObject.dragContainer.offsetTop;
      appObject.drs_data.leftPos = appObject.dragContainer.offsetLeft;
      appObject.drs_data.heightPos = appObject.dragContainer.offsetHeight;
      appObject.drs_data.widthPos = appObject.dragContainer.offsetWidth;
     
    }
    
    if (appObject.debug){
      console.log('Leaving -> windowMouseUp()');
    }
    
  }
  
  function updateView(){
      
      if (appObject.debug){
        console.log('Entering -> updateView()');
      }
      
      if (appObject.dragType == 'drag'){
        
        var leftHelp = parseInt(appObject.drag.elStartX + parseInt( parseInt(appObject.drag.nowX) - parseInt(appObject.drag.startX)));
        var topHelp = parseInt(appObject.drag.elStartY + parseInt( parseInt(appObject.drag.nowY) - parseInt(appObject.drag.startY)));
  
        
        
        if (appObject.dragContainer.classList.contains('snappableJS') && ((appObject.drag.nowX < 20) || (appObject.drag.nowX > (screen.width - 20)))){
            if( appObject.drag.nowX < 20){
              snapLeftSideDemo(appObject.dragContainer);
            } else {
              snapRightSideDemo(appObject.dragContainer);
            }
        } else {
          var helperSnap = document.querySelector('.snapClone')
          if (helperSnap != null){
            helperSnap.remove();
          }
          appObject.dragContainer.style.top = topHelp+'px';
          appObject.dragContainer.style.left = leftHelp+'px';
        }
      }
    
      if (appObject.dragType == 'resize'){
        var wHelp = parseInt(appObject.drag.elStartW + parseInt( parseInt(appObject.drag.nowX) - parseInt(appObject.drag.startX)));
        var hHelp = parseInt(appObject.drag.elStartH + parseInt( parseInt(appObject.drag.nowY) - parseInt(appObject.drag.startY)));
  
        if (appObject.dragContainer.classList.contains('snappedToLeft') || appObject.dragContainer.classList.contains('snappedToRight')){
          if (appObject.dragContainer.classList.contains('snappedToRight')){
            wHelp = parseInt(appObject.drag.elStartW + parseInt( parseInt(appObject.drag.startX) - parseInt(appObject.drag.nowX)));
            document.getElementById('applicationContainer').style.paddingRight = wHelp+'px';
          } else if(appObject.dragContainer.classList.contains('snappedToLeft')) {              
            document.getElementById('applicationContainer').style.paddingLeft = wHelp+'px';
          }
          document.getElementById('applicationContainer').style.width = 'calc( 100% - '+wHelp+'px)';
        } else {
          appObject.dragContainer.style.height = hHelp+'px';
          document.getElementById('applicationContainer').style.paddingRight = '0px';
          document.getElementById('applicationContainer').style.paddingLeft = '0px';
          document.getElementById('applicationContainer').style.width = 'calc( 100% )';
        }
        appObject.dragContainer.style.width = wHelp+'px';
      }
    
      if (appObject.debug){
        console.log('updateView() -> topHelp '+ hHelp +'; leftHelp '+ wHelp);
      }
  }
  
  function snapLeftSideButton(el){
    var helperEl = el.closest('.resizableJS.draggableJS');
    snapLeftSide(helperEl);
  }
  
  function snapRightSideButton(el){
    var helperEl = el.closest('.resizableJS.draggableJS');
    snapRightSide(helperEl);
  }
  
  function snapRightSide(el){
    
    if(el != null){
      el.style.left = 'unset';
      el.style.right = '0px';
      el.style.top = '0px';
      el.style.bottom = 'unset';
      el.style.height = '100%';
      el.style.width = '400px';
      el.classList.add('snappedToRight');
      document.getElementById('applicationContainer').style.paddingRight = '400px';
      document.getElementById('applicationContainer').style.width = 'calc( 100% - 400px )';
    }
  }
  
  function snapLeftSide(el){
    
    if(el != null){
      el.style.left = '0px';
      el.style.right = 'unset';
      el.style.top = '0px';
      el.style.bottom = 'unset';
      el.style.height = '100%';
      el.style.width = '400px';
      el.classList.add('snappedToLeft');
      document.getElementById('applicationContainer').style.paddingLeft = '400px';
      document.getElementById('applicationContainer').style.width = 'calc( 100% - 400px )';
    }
  }
  
  function snapLeftSideDemo(el){
    var cloneHelp = document.querySelector('.snapClone');
    if ( cloneHelp != null ){
      cloneHelp.remove();
    }
    cloneHelp = document.createElement("div");
    cloneHelp.classList.add('snapClone');
    document.documentElement.prepend("", cloneHelp);
    cloneHelp.style.display = 'block';
    cloneHelp.style.position = 'absolute';
    cloneHelp.style.zIndex = '-1';
    cloneHelp.style.background = 'gray';
    
    snapLeftSide(cloneHelp);
  }
  
  function snapRightSideDemo(el){
    var cloneHelp = document.querySelector('.snapClone');
    if ( cloneHelp != null ){
      cloneHelp.remove();
    }
    cloneHelp = document.createElement("div");
    cloneHelp.classList.add('snapClone');
    document.documentElement.prepend("", cloneHelp);
    cloneHelp.style.display = 'block';
    cloneHelp.style.position = 'absolute';
    cloneHelp.style.zIndex = '-1';
    cloneHelp.style.background = 'gray';
    
    snapRightSide(cloneHelp);
  }

  function createDrsSidebar(id = null){
    if (id == null){
        id = 'sidebar'+generateRandomNumber();
    }
    document.getElementById('applicationContainer').innerHTML +=    `<div class="containerDrsSidebar draggableJS resizableJS snappableJS" id='`+id+`'>
                                                                        <div class="con-header dragHandleJS">
                                                                            <p class="con-title">DRAG USING MEEE</p>
                                                                            <div class='options'>
                                                                                <button onclick='snapLeftSideButton(this)'><</button>
                                                                                <button onclick='snapRightSideButton(this)'>></button>
                                                                            </div>
                                                                        </div>
                                                                        <div class="con-body ">
                                                                        </div>
                                                                        <div class="con-footer">
                                                                        </div>
                                                                    </div>`;
    if ((appObject.drs_data != null) && (appObject.drs_data != "")){
        document.getElementById(id).style.top = appObject.drs_data.topPos+'px';
        document.getElementById(id).style.left = appObject.drs_data.leftPos+'px';
        document.getElementById(id).style.width = appObject.drs_data.widthPos+'px';
        document.getElementById(id).style.height = appObject.drs_data.heightPos+'px';
    }

  }


/*
  
  (function() {
  
    if (appObject.debug){
      console.log('started draggable.js');
    }
    
    startDraggableJS();
    
  })();

  */