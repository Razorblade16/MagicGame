//
//  inspect.js
//  examples
//
//  Created by Clément Brisset on March 20, 2014
//  Copyright 2014 High Fidelity, Inc.
//
//  Allows you to inspect non moving objects (Voxels or Avatars) using Atl, Control (Command on Mac) and Shift
//
//  Once you are in a mode left click on the object to inspect and hold the click
//  Dragging the mouse will move your camera according to the mode you are in.
//
//  CtrlAltStudio modifications:
//  - Change the pan directions to be the same as Second Life.
//  - Reduce the pan speed to be more similar to Second Life.
//
//  CtrlAltStudio information: http://ctrlaltstudio.com/hifi

//  summer4me... modifications: 
//  radial mode = hold b +left mouse button
//  orbit mode  = hold n +left mouse button
//  pan mode    = hold v +left mouse button
//  SPACE = switching between avatar and object inspection
//  w,a,s,d,e,c = avatar moving, if pan, orbit or rotation mode is activ
//  j = reset camera parameters and avatar position 
//  k = restore old camera mode - use this, if you want, to use the normal wasd keys
//  new 9_2015: click the pan, orbit or radial button and move the mouse with clicked button

//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

var PI = Math.PI;
var RAD_TO_DEG = 180.0 / PI;

var AZIMUTH_RATE = 90.0;
var ALTITUDE_RATE = 200.0;
var RADIUS_RATE = 1.0 / 100.0;
var PAN_RATE = 200.0;

var Y_AXIS = { x: 0, y: 1, z: 0 };
var X_AXIS = { x: 1, y: 0, z: 0 };

var alt = false;
var shift = false;
var control = false;
var isActive = false;

var noMode = 0;
var orbitMode = 1;
var radialMode = 2;
var panningMode = 3;
var detachedMode = 4;

var mode = noMode;

var mouseLastX = 0;
var mouseLastY = 0;

var center = { x: 0, y: 0, z: 0 };
var position = { x: 0, y: 0, z: 0 };
var vector = { x: 0, y: 0, z: 0 };
var radius = 0.0;
var azimuth = 0.0;
var altitude = 0.0;

var avatarPosition ={ x: 0.0, y: 0.0, z: 0.0 };
var avatarpanPosition = { x: 0.0, y: 0.0, z: 0.0 };
var avatarOrientation = { x: 0.0, y: 0.0, z: 0.0,w:0.0 };

var avatar=true;
var dxLast=0.0;
var dyLast=0.0;
var panx =0.0;
var pany=0.0;
var start=true;

var buttonImageUrl = "https://dl.dropboxusercontent.com/u/48725104/inspectbuttons.png";
var windowDimensions = Controller.getViewportDimensions();
var poseButtons=0;
var buttonWidth = 46;
var buttonHeight = 37;
var buttonPadding = 10;
var buttonPositionX = windowDimensions.x - buttonPadding - 6*buttonWidth;
var buttonPositionY = (windowDimensions.y -100);

var panButton = Overlays.addOverlay("image",{
    x: buttonPositionX-3*buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: true,
    alpha: 1.0});

var radialButton = Overlays.addOverlay("image",{
    x: buttonPositionX-2*buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 3*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: true,
    alpha: 1.0});


var orbitButton = Overlays.addOverlay("image",{
    x: buttonPositionX-buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 2*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: true,
    alpha: 1.0});

var resetButton = Overlays.addOverlay("image",{
    x: buttonPositionX, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 4*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: true,
    alpha: 1.0});



function onDomainChanged()
{   var domainName = Window.location.hostname;
    // BUG: Window.domainChanged doesn't fire if you teleport to your own local domain on same PC.
    print("domain name: " + domainName);
    restoreCameraState();
    
}
Window.domainChanged.connect(onDomainChanged);


function orientationOf(vector)
{   var direction,
        yaw,
        pitch;

    direction = Vec3.normalize(vector);
    yaw = Quat.angleAxis(Math.atan2(direction.x, direction.z) * RAD_TO_DEG, Y_AXIS);
    pitch = Quat.angleAxis(Math.asin(-direction.y) * RAD_TO_DEG, X_AXIS);
    return Quat.multiply(yaw, pitch);
}


function handleRadialMode(dx, dy)
{
    azimuth += dx / AZIMUTH_RATE;
    radius += radius * dy * RADIUS_RATE;
    if (radius < 1)
    {
        radius = 1;
    }
    
    vector = { x: (Math.cos(altitude) * Math.cos(azimuth)) * radius,
               y: Math.sin(altitude) * radius,
               z: (Math.cos(altitude) * Math.sin(azimuth)) * radius };
    
    position = Vec3.sum(center, vector);
    
    Camera.setPosition(position);
    Camera.setOrientation(orientationOf(vector));
    
}

function handleOrbitMode(dx, dy) {
    azimuth += dx / AZIMUTH_RATE;
    altitude += dy / ALTITUDE_RATE;
    if (altitude > PI / 2.0) {
        altitude = PI / 2.0;
    }
    if (altitude < -PI / 2.0) {
        altitude = -PI / 2.0;
    }
    vector = { x:(Math.cos(altitude) * Math.cos(azimuth)) * radius,
               y:Math.sin(altitude) * radius,
               z:(Math.cos(altitude) * Math.sin(azimuth)) * radius };
    position = Vec3.sum(center, vector);
    
    Camera.setPosition(position);
    Camera.setOrientation(orientationOf(vector));
     print("orientation: " + vector.x+" " +vector.y+" " +vector.z);
}

function handlePanMode(dx, dy)
{
    var up = Quat.getUp(Camera.getOrientation());
    var right = Quat.getRight(Camera.getOrientation());
    var distance = Vec3.length(vector);
    var dv = Vec3.sum(Vec3.multiply(up, distance * dy / PAN_RATE), Vec3.multiply(right, -distance * dx / PAN_RATE));
    panx=panx+distance * dx / PAN_RATE;
    pany=pany+distance * dy / PAN_RATE;
    avatarpanPosition.x=avatarPosition.x +panx;
    avatarpanPosition.y=avatarPosition.y+ pany;
    center = Vec3.sum(center, dv);
    position = Vec3.sum(position, dv);
    Camera.setPosition(position);
    Camera.setOrientation(orientationOf(vector));
}

function saveCameraState()
{
    oldMode = Camera.mode;
    
}

function restoreCameraState()
{   avatarpanPosition=MyAvatar.position;
    avatarPosition=MyAvatar.position;
    center=avatarpanPosition;
    
    panx=0.0;
    pany=0.0;

    Camera.mode = oldMode;
}


function keyPressEvent(event)
{   
    if(event.text== "SPACE")
    {   if (avatar ==false)
            avatar=true;
        else
            avatar=false;
    }
    else
    {    if (event.text == "b")
        {   mode=radialMode;
            Controller.captureMouseEvents(mouseMoveEvent);
        }
        else if (event.text == "n")
        {
            mode=orbitMode;
            Controller.captureMouseEvents();
            
        }
        else if (event.text == "v")
        {
            mode=panningMode;
            Controller.captureMouseEvents();
            
        }
        else if(event.text== "j" )
        {   avatarpanPosition=MyAvatar.position;
            avatarPosition=MyAvatar.position;
            center=avatarpanPosition;
            panx=0.0;
            pany=0.0;

        }
        else if(event.text== "k" )
        {
            restoreCameraState();
        }
        else if (event.text == "w")
       {   var avo = Quat.safeEulerAngles(MyAvatar.orientation);
            avatarPosition.x=avatarPosition.x-0.1*Math.sin((avo.y*Math.PI)/180);
            avatarPosition.z=avatarPosition.z-0.1*Math.cos((avo.y*Math.PI)/180);
            MyAvatar.position=avatarPosition;
            print("key:" +event.text + avo.y +" sin: " +Math.sin((avo.y*Math.PI)/180)+"cos" +Math.cos((avo.y*Math.PI)/180));
        }
        else if (event.text == "s")
        {   var avo = Quat.safeEulerAngles(MyAvatar.orientation);
            avatarPosition.x=avatarPosition.x+0.1*Math.sin((avo.y*Math.PI)/180);
            avatarPosition.z=avatarPosition.z+0.1*Math.cos((avo.y*Math.PI)/180);
            MyAvatar.position=avatarPosition;
            print("key:" +event.text + avo.y +" sin: " +Math.sin((avo.y*Math.PI)/180)+"cos" +Math.cos((avo.y*Math.PI)/180));
        }
        else if (event.text == "e")
        {   avatarPosition=MyAvatar.position;
            avatarPosition.y=avatarPosition.y+0.05;
            MyAvatar.position=avatarPosition;
            print("key:" +event.text)
        }
        else if (event.text == "c")
        {   avatarPosition=MyAvatar.position;
            avatarPosition.y=avatarPosition.y-0.05;
            MyAvatar.position=avatarPosition;
            print("key:" +event.text + avatarOrientation.y);
        }

        else if (event.text == "a")
        {   var avo = Quat.safeEulerAngles(MyAvatar.orientation);
            avo.y=avo.y+3.0;
            MyAvatar.orientation=Quat.fromVec3Degrees( avo );
            print("key:" +event.text + avo.y +" avo " +MyAvatar.orientation.y);
        }
        else if (event.text == "d")
        {   var avo = Quat.safeEulerAngles(MyAvatar.orientation);
            avo.y=avo.y-3.0;
            MyAvatar.orientation=Quat.fromVec3Degrees( avo );
            print("key:" +event.text + avo.y +" avo " +MyAvatar.orientation.y);
            
        }
    }
}

function keyReleaseEvent(event)
{
    if(event.text=="w" || event.text=="s"  || event.text=="a"   || event.text=="d"  || event.text=="e" ||event.text=="c")
    {   avatarpanPosition=MyAvatar.position;
        avatarPosition=MyAvatar.position;
        center=avatarpanPosition;
        panx=0.0;
        pany=0.0;
        print("key:" +event.text)
    }
    mode=detachedMode;
    Controller.releaseMouseEvents();
}


function mousePressEvent(event)
{   print("Mode: " + Camera.mode);
    
    if(avatarPosition.x!=MyAvatar.position.x || avatarPosition.y!=MyAvatar.position.y   ||avatarPosition.z!=MyAvatar.position.z )
    {   print("ax: "+ avatarPosition.x +" ay: "+ avatarPosition.y +" az: "+ avatarPosition.z);
    print("apx: "+ avatarpanPosition.x +" apy: "+ avatarpanPosition.y +" apz: "+ avatarpanPosition.z);
    print("max: "+ MyAvatar.position.x +" ay: "+ MyAvatar.position.y +" az: "+ MyAvatar.position.z);
    avatarPosition=MyAvatar.position;
    avatarOrientation=MyAvatar.orientation;
    avatarpanPosition.x=avatarPosition.x+panx;
    avatarpanPosition.y=avatarPosition.y+ pany;
    center=avatarpanPosition;
    
    }

    print("Mode: " + Camera.mode);
    if(start==true)
    {   saveCameraState();
        avatarpanPosition=MyAvatar.position;
        avatarPosition=MyAvatar.position;
        center=avatarpanPosition;
        panx=0.0;
        pany=0.0;
        start=false;
    }
    
    
    
    
    var clickedOverlay = Overlays.getOverlayAtPoint({x: event.x, y: event.y});
    
    if (clickedOverlay == panButton)
    {   mode=panningMode;
        Controller.captureMouseEvents(mouseMoveEvent);
        
        
    }
    else if (clickedOverlay == orbitButton)
    {
        mode=orbitMode;
        Controller.captureMouseEvents(mouseMoveEvent);
    }
    else if (clickedOverlay == radialButton)
    {   mode=radialMode;
        Controller.captureMouseEvents(mouseMoveEvent);
        
        
    }
    else if (clickedOverlay == resetButton)
    {   avatarpanPosition=MyAvatar.position;
        avatarPosition=MyAvatar.position;
        center=avatarpanPosition;
        panx=0.0;
        pany=0.0;
    }

    
    
    
    
    
    if ((mode==radialMode ||mode==panningMode||mode==orbitMode) && !isActive)
    {
        mouseLastX = event.x;
        mouseLastY = event.y;
        
        // Compute trajectories related values
        var pickRay = Camera.computePickRay(mouseLastX, mouseLastY);
        var modelIntersection = Entities.findRayIntersection(pickRay);
        
        position = Camera.getPosition();
        var distance = -1;
        var string;
        
       if (avatar ==false)// &&  modelIntersection.intersects && modelIntersection.accurate)
       {
            distance = modelIntersection.distance;
            center = modelIntersection.properties.position;
            string = "Inspecting model";
        }
        else if(avatar==true)
        {
            distance = Vec3.length(Vec3.subtract(avatarpanPosition, position));
            string = "Inspecting avatar";
            
        }
        if (distance == -1) {
            return;
        }
        
        vector = Vec3.subtract(position, center);
        radius = Vec3.length(vector);
        azimuth = Math.atan2(vector.z, vector.x);
        altitude = Math.asin(vector.y / Vec3.length(vector));
        print(string);
        isActive = true;
        Camera.mode = "independent";
    }
}

function mouseReleaseEvent(event)
{
    if (isActive)
    {
        isActive = false;
       
    }
    mode=detachedMode;
    
}

function mouseMoveEvent(event)
{
    
    if (isActive && mode != noMode)
    {
        if (mode == radialMode) {
            handleRadialMode(event.x - mouseLastX, event.y - mouseLastY);
        }
        if (mode == orbitMode) {
            handleOrbitMode(event.x - mouseLastX, event.y - mouseLastY);
        }
        if (mode == panningMode) {
            handlePanMode(event.x - mouseLastX, event.y - mouseLastY);
        }
        
        mouseLastX = event.x;
        mouseLastY = event.y;
        dxLast=event.x - mouseLastX;
        dyLast=event.y - mouseLastY;
    }
   
}

function update()
{
    
}

function scriptEnding()
{
    if (mode != noMode)
    {
        restoreCameraState();
    }
    Overlays.deleteOverlay(panButton);
    Overlays.deleteOverlay(orbitButton);
    Overlays.deleteOverlay(radialButton);
    Overlays.deleteOverlay(resetButton);
    Controller.releaseMouseEvents()
}

//Controller.captureMouseEvents();
//Controller.captureKeyEvents({key: "w"});
//Controller.captureKeyEvents({key: "s"});
//Controller.captureKeyEvents({key: "a"});
//Controller.captureKeyEvents({key: "d"});
//Controller.captureKeyEvents({key: "e"});
//Controller.captureKeyEvents({key: "c"});
Controller.keyPressEvent.connect(keyPressEvent);
Controller.keyReleaseEvent.connect(keyReleaseEvent);
Controller.mousePressEvent.connect(mousePressEvent);
Controller.mouseReleaseEvent.connect(mouseReleaseEvent);
Controller.mouseMoveEvent.connect(mouseMoveEvent);

Script.update.connect(update);
Script.scriptEnding.connect(scriptEnding);