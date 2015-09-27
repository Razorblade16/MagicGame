//
//  Pose.js
//
//  Copyright 2015 summer4me...
//
//  This example let you sit at a stool, lay in jour bed or meditate.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//



var buttonImageUrl = "https://dl.dropboxusercontent.com/u/48725104/posebuttons5.png";
var windowDimensions = Controller.getViewportDimensions();
var poseButtons=0;
var buttonWidth = 46;
var buttonHeight = 37;
var buttonPadding = 10;
var buttonPositionX = windowDimensions.x - buttonPadding - 6*buttonWidth;
var buttonPositionY = (windowDimensions.y -60);
var poseButton = Overlays.addOverlay("image",{
    x: buttonPositionX, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: true,
    alpha: 1.0});

var sitDownButton = Overlays.addOverlay("image",{
    x: buttonPositionX-buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 3*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: false,
    alpha: 1.0});

var sit2DownButton = Overlays.addOverlay("image",{
    x: buttonPositionX-2*buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 3*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: false,
    alpha: 1.0});


var meditateButton = Overlays.addOverlay("image",{
    x: buttonPositionX-3*buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 4*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: false,
    alpha: 1.0});

var layDownButton = Overlays.addOverlay("image",{
    x: buttonPositionX-4*buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 5*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: false,
    alpha: 1.0});

var readingButton = Overlays.addOverlay("image",{
    x: buttonPositionX-5*buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 5*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: false,
    alpha: 1.0});

var standingButton = Overlays.addOverlay("image",{
    x: buttonPositionX-6*buttonWidth, y: buttonPositionY, width: buttonWidth, height: buttonHeight,
    subImage: { x: 2*buttonWidth, y: buttonHeight, width: buttonWidth, height: buttonHeight},
    imageURL: buttonImageUrl,
    visible: false,
    alpha: 1.0});

var passedTime = 0.0;
var startPosition = null;
var startRotation = null;
var animationLenght = 2.0;
var homePosition = { x: 0, y: 0, z: 0 };
var start=0;
var frame = 0;
var laying=false;
var sitting =false;
var meditating= false;
var standing= false;
var sitting2 =false;
var reading=false;

//change, if your model has other bone name
var joints = {Hips:"Hips", Spine:"Spine",Spine1:"Spine1",Neck:"Neck",Head:"Head",LeftShoulder:"LeftShoulder",LeftShoulderExtra:"LeftShoulderExtra",RightShoulder:"RightShoulder",RightShoulderExtra:"RightShoulderExtra",LeftArm:"LeftArm",LeftForeArm:"LeftForeArm",LeftHand:"LeftHand",RightArm:"RightArm",RightForeArm:"RightForeArm",RightHand:"RightHand",LeftUpLeg:"LeftUpLeg",LeftLeg:"LeftLeg",LeftFoot:"LeftFoot",RightUpLeg:"RightUpLeg",RightLeg:"RightLeg",RightFoot:"RightFoot",LeftEye:"LeftEye",RightEye:"RightEye",LeftHandPinky1:"LeftHandPinky1",LeftHandPinky2:"LeftHandPinky2",LeftHandPinky3:"LeftHandPinky3",LeftHandPinky4:"LeftHandPinky4",LeftHandRing1:"LeftHandRing1",LeftHandRing2:"LeftHandRing2",LeftHandRing3:"LeftHandRing3",LeftHandRing4:"LeftHandRing4",LeftHandMiddle1:"LeftHandMiddle1",LeftHandMiddle2:"LeftHandMiddle2",LeftHandMiddle3:"LeftHandMiddle3",LeftHandMiddle4:"LeftHandMiddle4",LeftHandIndex1:"LeftHandIndex1",LeftHandIndex2:"LeftHandIndex2",LeftHandIndex3:"LeftHandIndex3",LeftHandIndex4:"LeftHandIndex4",LeftHandThumb1:"LeftHandThumb1",LeftHandThumb2:"LeftHandThumb2",LeftHandThumb3:"LeftHandThumb3",LeftHandThumb4:"LeftHandThumb4",RightHandPinky1:"RightHandPinky1",RightHandPinky2:"RightHandPinky2",RightHandPinky3:"RightHandPinky3",RightHandPinky4:"RightHandPinky4",RightHandRing1:"RightHandRing1",RightHandRing2:"RightHandRing2",RightHandRing3:"RightHandRing3",RightHandRing4:"RightHandRing4",RightHandMiddle1:"RightHandMiddle1",RightHandMiddle2:"RightHandMiddle2",RightHandMiddle3:"RightHandMiddle3",RightHandMiddle4:"RightHandMiddle4",RightHandIndex1:"RightHandIndex1",RightHandIndex2:"RightHandIndex2",RightHandIndex3:"RightHandIndex3",RightHandIndex4:"RightHandIndex4",RightHandThumb1:"RightHandThumb1",RightHandThumb2:"RightHandThumb2",RightHandThumb3:"RightHandThumb3",RightHandThumb4:"RightHandThumb4"};

//Buttonposes__________________________________________________________________________________________________________________
//sitting1
var pose =
[   {joint:joints.Hips, rotation: {x:0, y:0, z:0}},
 {joint:joints.Spine, rotation: {x:0, y:0, z:0}},
 {joint:joints.Spine1, rotation: {x:0, y:0, z:0}},
 {joint:joints.Neck, rotation: {x:7, y:0, z:0}},
 {joint:joints.Head, rotation: {x:9, y:0, z:2}},
 {joint:joints.LeftShoulder, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulder, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftArm, rotation: {x:70, y:-4, z:39}},
 {joint:joints.LeftForeArm, rotation: {x:5, y:-14, z:49}},
 {joint:joints.LeftHand, rotation: {x:-10, y:0, z:0}},
 {joint:joints.RightArm, rotation: {x:70, y:0, z:-54}},
 {joint:joints.RightForeArm, rotation: {x:-29, y:-14, z:-39}},
 {joint:joints.RightHand, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftUpLeg, rotation: {x:99, y:24, z:0}},
 {joint:joints.LeftLeg, rotation: {x:-79, y:-9, z:0}},
 {joint:joints.LeftFoot, rotation: {x:0, y:14, z:4}},
 {joint:joints.RightUpLeg, rotation: {x:84, y:-4, z:0}},
 {joint:joints.RightLeg, rotation: {x:-79, y:4, z:-0}},
 {joint:joints.RightFoot, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftEye, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightEye, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandPinky1, rotation: {x:40, y:0, z:18}},
 {joint:joints.LeftHandPinky2, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandPinky3, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing1, rotation: {x:39, y:0, z:9}},
 {joint:joints.LeftHandRing2, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing3, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandMiddle1, rotation: {x:39, y:0, z:0}},
 {joint:joints.LeftHandMiddle2, rotation: {x:-4, y:0, z:5}},
 {joint:joints.LeftHandMiddle3, rotation: {x:5, y:0, z:-1}},
 {joint:joints.LeftHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex1, rotation: {x:34, y:0, z:-1}},
 {joint:joints.LeftHandIndex2, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex3, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb1, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb2, rotation: {x:2, y:0, z:10}},
 {joint:joints.LeftHandThumb3, rotation: {x:-2, y:0, z:-12}},
 {joint:joints.LeftHandThumb4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky1, rotation: {x:33, y:13, z:-6}},
 {joint:joints.RightHandPinky2, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky3, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing1, rotation: {x:32, y:13, z:2}},
 {joint:joints.RightHandRing2, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing3, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandMiddle1, rotation: {x:32, y:13, z:11}},
 {joint:joints.RightHandMiddle2, rotation: {x:-4, y:0, z:-5}},
 {joint:joints.RightHandMiddle3, rotation: {x:5, y:0, z:1}},
 {joint:joints.RightHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex1, rotation: {x:26, y:14, z:11}},
 {joint:joints.RightHandIndex2, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex3, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb1, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb2, rotation: {x:2, y:0, z:-10}},
 {joint:joints.RightHandThumb3, rotation: {x:-2, y:0, z:12}},
 {joint:joints.RightHandThumb4, rotation: {x:0, y:0, z:0}}
 
 ];


//meditation
var pose2 =
[   {joint:joints.Hips, rotation: {x:9.549652735252323e-16, y:8.126832540256146e-14, z:-2.646771690706373e-12}},
 {joint:joints.Spine, rotation: {x:-0.0000176751273102127, y:-0.003124319249764085, z:0.038534779101610184}},
 {joint:joints.Spine1, rotation: {x:-4.17497290072788e-7, y:-1.677213701256619e-9, z:9.221501784395514e-9}},
 {joint:joints.Neck, rotation: {x:7.652272701263428, y:-0.005135146901011467, z:-0.0005023335688747466}},
 {joint:joints.Head, rotation: {x:-1.000847578048706, y:5.998467445373535, z:-1.000424861907959}},
 {joint:joints.LeftShoulder, rotation: {x:-4.4276956145949953e-7, y:8.441048180429789e-7, z:-0.000001772323003024212}},
 {joint:joints.LeftShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulder, rotation: {x:0.00004471950887818821, y:-0.000004222378720442066, z:-0.000013855306860932615}},
 {joint:joints.RightShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftArm, rotation: {x:70, y:0.0000017075473124350538, z:60.000003814697266}},
 {joint:joints.LeftForeArm, rotation: {x:-39.99829864501953, y:14.99999713897705, z:20.0008544921875}},
 {joint:joints.LeftHand, rotation: {x:-20.0008487701416, y:5.711627282245502e-10, z:-3.969944373238832e-10}},
 {joint:joints.RightArm, rotation: {x:70, y:0, z:-60.000003814697266}},
 {joint:joints.RightForeArm, rotation: {x:-39.99829864501953, y:-14.999999046325684, z:-20.000001907348633}},
 {joint:joints.RightHand, rotation: {x:-20.00084686279297, y:-6.193658919073641e-10, z:1.703028829069808e-10}},
 {joint:joints.LeftUpLeg, rotation: {x:99.99889373779297, y:-14.9991455078125, z:0}},
 {joint:joints.LeftLeg, rotation: {x:-149.99659729003906, y:-69.99446105957031, z:-0.0008510013576596975}},
 {joint:joints.LeftFoot, rotation: {x:29.999143600463867, y:14.99966049194336, z:0.0009351557237096131}},
 {joint:joints.RightUpLeg, rotation: {x:99.99889373779297, y:14.999486923217773, z:0}},
 {joint:joints.RightLeg, rotation: {x:-119.99977111816406, y:79.99374389648438, z:0.0008549714111723006}},
 {joint:joints.RightFoot, rotation: {x:20.00008201599121, y:4.9993181228637695, z:-0.0004249817575328052}},
 {joint:joints.LeftEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.RightEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.LeftHandPinky1, rotation: {x:40.63654708862305, y:-0.21107253432273865, z:18.403833389282227}},
 {joint:joints.LeftHandPinky2, rotation: {x:0.000004694138624472544, y:-0.0000016655130821163766, z:-0.0000033542951314302627}},
 {joint:joints.LeftHandPinky3, rotation: {x:-0.000005163712103239959, y:0.000001751219542711624, z:-0.0000016627121794954292}},
 {joint:joints.LeftHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing1, rotation: {x:39.800079345703125, y:-0.03487089276313782, z:9.879484176635742}},
 {joint:joints.LeftHandRing2, rotation: {x:0.000006711739843012765, y:-0.00000712655628376524, z:-0.000006505028977699112}},
 {joint:joints.LeftHandRing3, rotation: {x:0.000004191336756775854, y:0.000005105387117509963, z:-4.194907603505271e-7}},
 {joint:joints.LeftHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandMiddle1, rotation: {x:39.38565444946289, y:-0.0000012385008858473157, z:0.000014395456673810259}},
 {joint:joints.LeftHandMiddle2, rotation: {x:-4.05641508102417, y:0.3774471580982208, z:5.1320414543151855}},
 {joint:joints.LeftHandMiddle3, rotation: {x:5.6164937019348145, y:0.15701861679553986, z:-1.7822577953338623}},
 {joint:joints.LeftHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex1, rotation: {x:34.155487060546875, y:-0.11175765842199326, z:-1.2933320999145508}},
 {joint:joints.LeftHandIndex2, rotation: {x:0.000014470761016127653, y:-0.0000024514697543054353, z:-0.000008425206942774821}},
 {joint:joints.LeftHandIndex3, rotation: {x:0.000004216826710035093, y:0.000001706311081761669, z:-6.49550955245104e-8}},
 {joint:joints.LeftHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb1, rotation: {x:0.0000015762573184474604, y:-0.000002748477072600508, z:-0.0000013436177823678008}},
 {joint:joints.LeftHandThumb2, rotation: {x:2.3644328117370605, y:-0.5487232804298401, z:10.30003833770752}},
 {joint:joints.LeftHandThumb3, rotation: {x:-2.0924696922302246, y:-0.4029260575771332, z:-12.537420272827148}},
 {joint:joints.LeftHandThumb4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky1, rotation: {x:33.44302749633789, y:13.278701782226562, z:-6.222424507141113}},
 {joint:joints.RightHandPinky2, rotation: {x:-4.42792440935591e-7, y:0.0000034147271890105912, z:-3.158827865945568e-8}},
 {joint:joints.RightHandPinky3, rotation: {x:-0.000004913259544991888, y:-0.0000035210537134844344, z:0.00000504609943163814}},
 {joint:joints.RightHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing1, rotation: {x:32.572513580322266, y:13.28342342376709, z:2.065617084503174}},
 {joint:joints.RightHandRing2, rotation: {x:-0.000012815036825486459, y:-0.0000037078114019095665, z:-0.000006676390057691606}},
 {joint:joints.RightHandRing3, rotation: {x:0.000011429883670643903, y:0.000003889683284796774, z:0.0000065729095695132855}},
 {joint:joints.RightHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandMiddle1, rotation: {x:32.183536529541016, y:13.330343246459961, z:11.768068313598633}},
 {joint:joints.RightHandMiddle2, rotation: {x:-4.061400890350342, y:-0.375725656747818, z:-5.110332012176514}},
 {joint:joints.RightHandMiddle3, rotation: {x:5.634244441986084, y:-0.15915340185165405, z:1.7950518131256104}},
 {joint:joints.RightHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex1, rotation: {x:26.942062377929688, y:14.44775390625, z:11.816292762756348}},
 {joint:joints.RightHandIndex2, rotation: {x:0.000009685144505056087, y:0.0000031052902613737388, z:-0.000003731606284418376}},
 {joint:joints.RightHandIndex3, rotation: {x:-0.0000016811942487038323, y:1.284668513790166e-7, z:0.0000034474057883926434}},
 {joint:joints.RightHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb1, rotation: {x:0.000007135924533940852, y:0.0000035432499316812027, z:-0.000003624786813816172}},
 {joint:joints.RightHandThumb2, rotation: {x:2.4335038661956787, y:0.5656800270080566, z:-10.379449844360352}},
 {joint:joints.RightHandThumb3, rotation: {x:-2.0917153358459473, y:0.4010162949562073, z:12.493453025817871}},
 {joint:joints.RightHandThumb4, rotation: {x:0, y:0, z:0}}
 ];

//laying
var pose3 =
[   {joint:joints.Hips, rotation: {x:-82.99232482910156, y:7.514880443943215e-18, z:-2.448128770170065e-16}},
 {joint:joints.Spine, rotation: {x:-0.0000176751273102127, y:-0.003124319249764085, z:0.038534779101610184}},
 {joint:joints.Spine1, rotation: {x:-4.17497290072788e-7, y:-1.677213701256619e-9, z:9.221501784395514e-9}},
 {joint:joints.Neck, rotation: {x:7.652272701263428, y:-0.00513514643535018, z:-0.0005023333942517638}},
 {joint:joints.Head, rotation: {x:-0.00009262561798095703, y:0.0005550384521484375, z:-0.00009250640869140625}},
 {joint:joints.LeftShoulder, rotation: {x:-4.4276956145949953e-7, y:8.441048180429789e-7, z:-0.000001772323003024212}},
 {joint:joints.LeftShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulder, rotation: {x:0.00004471950887818821, y:-0.000004222378720442066, z:-0.000013855306860932615}},
 {joint:joints.RightShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftArm, rotation: {x:100.01386260986328, y:-130.00462341308594, z:-80.0036849975586}},
 {joint:joints.LeftForeArm, rotation: {x:99.98706817626953, y:-99.98938751220703, z:0.0018578114686533809}},
 {joint:joints.LeftHand, rotation: {x:-0.001850128173828125, y:69.9935302734375, z:0}},
 {joint:joints.RightArm, rotation: {x:100.01386260986328, y:130.00462341308594, z:80.0036849975586}},
 {joint:joints.RightForeArm, rotation: {x:99.98706817626953, y:99.98938751220703, z:-0.0018578114686533809}},
 {joint:joints.RightHand, rotation: {x:-0.001850128173828125, y:-69.9935302734375, z:0}},
 {joint:joints.LeftUpLeg, rotation: {x:50.0046272277832, y:-15.000000953674316, z:0}},
 {joint:joints.LeftLeg, rotation: {x:-80.00647735595703, y:-0.006477355491369963, z:-7.858219674972133e-8}},
 {joint:joints.LeftFoot, rotation: {x:-39.993526458740234, y:14.999999046325684, z:0}},
 {joint:joints.RightUpLeg, rotation: {x:50.0046272277832, y:15.000000953674316, z:0}},
 {joint:joints.RightLeg, rotation: {x:-80.00370025634766, y:0.007400511763989925, z:7.879063446125656e-8}},
 {joint:joints.RightFoot, rotation: {x:-29.99537467956543, y:5.000000953674316, z:-1.071293667109785e-7}},
 {joint:joints.LeftEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.RightEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.LeftHandPinky1, rotation: {x:40.63654708862305, y:-0.21107253432273865, z:18.403833389282227}},
 {joint:joints.LeftHandPinky2, rotation: {x:0.000004694138624472544, y:-0.0000016655130821163766, z:-0.0000033542951314302627}},
 {joint:joints.LeftHandPinky3, rotation: {x:-0.000005163712103239959, y:0.000001751219542711624, z:-0.0000016627121794954292}},
 {joint:joints.LeftHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing1, rotation: {x:39.800079345703125, y:-0.03487089276313782, z:9.879484176635742}},
 {joint:joints.LeftHandRing2, rotation: {x:0.000006711739843012765, y:-0.00000712655628376524, z:-0.000006505028977699112}},
 {joint:joints.LeftHandRing3, rotation: {x:0.000004191336756775854, y:0.000005105387117509963, z:-4.194907603505271e-7}},
 {joint:joints.LeftHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandMiddle1, rotation: {x:39.38565444946289, y:-0.0000012385008858473157, z:0.000014395456673810259}},
 {joint:joints.LeftHandMiddle2, rotation: {x:-4.05641508102417, y:0.3774471580982208, z:5.1320414543151855}},
 {joint:joints.LeftHandMiddle3, rotation: {x:5.6164937019348145, y:0.15701861679553986, z:-1.7822577953338623}},
 {joint:joints.LeftHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex1, rotation: {x:34.155487060546875, y:-0.11175765842199326, z:-1.2933320999145508}},
 {joint:joints.LeftHandIndex2, rotation: {x:0.000014470761016127653, y:-0.0000024514697543054353, z:-0.000008425206942774821}},
 {joint:joints.LeftHandIndex3, rotation: {x:0.000004216826710035093, y:0.000001706311081761669, z:-6.49550955245104e-8}},
 {joint:joints.LeftHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb1, rotation: {x:0.0000015762573184474604, y:-0.000002748477072600508, z:-0.0000013436177823678008}},
 {joint:joints.LeftHandThumb2, rotation: {x:2.3644328117370605, y:-0.5487232804298401, z:10.30003833770752}},
 {joint:joints.LeftHandThumb3, rotation: {x:-2.0924696922302246, y:-0.4029260575771332, z:-12.537420272827148}},
 {joint:joints.LeftHandThumb4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky1, rotation: {x:33.44302749633789, y:13.278701782226562, z:-6.222424507141113}},
 {joint:joints.RightHandPinky2, rotation: {x:-4.42792440935591e-7, y:0.0000034147271890105912, z:-3.158827865945568e-8}},
 {joint:joints.RightHandPinky3, rotation: {x:-0.000004913259544991888, y:-0.0000035210537134844344, z:0.00000504609943163814}},
 {joint:joints.RightHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing1, rotation: {x:32.572513580322266, y:13.28342342376709, z:2.065617084503174}},
 {joint:joints.RightHandRing2, rotation: {x:-0.000012815036825486459, y:-0.0000037078114019095665, z:-0.000006676390057691606}},
 {joint:joints.RightHandRing3, rotation: {x:0.000011429883670643903, y:0.000003889683284796774, z:0.0000065729095695132855}},
 {joint:joints.RightHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandMiddle1, rotation: {x:32.183536529541016, y:13.330343246459961, z:11.768068313598633}},
 {joint:joints.RightHandMiddle2, rotation: {x:-4.061400890350342, y:-0.375725656747818, z:-5.110332012176514}},
 {joint:joints.RightHandMiddle3, rotation: {x:5.634244441986084, y:-0.15915340185165405, z:1.7950518131256104}},
 {joint:joints.RightHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex1, rotation: {x:26.942062377929688, y:14.44775390625, z:11.816292762756348}},
 {joint:joints.RightHandIndex2, rotation: {x:0.000009685144505056087, y:0.0000031052902613737388, z:-0.000003731606284418376}},
 {joint:joints.RightHandIndex3, rotation: {x:-0.0000016811942487038323, y:1.284668513790166e-7, z:0.0000034474057883926434}},
 {joint:joints.RightHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb1, rotation: {x:0.000007135924533940852, y:0.0000035432499316812027, z:-0.000003624786813816172}},
 {joint:joints.RightHandThumb2, rotation: {x:2.4335038661956787, y:0.5656800270080566, z:-10.379449844360352}},
 {joint:joints.RightHandThumb3, rotation: {x:-2.0917153358459473, y:0.4010162949562073, z:12.493453025817871}},
 {joint:joints.RightHandThumb4, rotation: {x:0, y:0, z:0}}
 ];

//standing
var pose4 =
[   {joint:joints.Hips, rotation: {x:-0.9926973581314087, y:0.9927061200141907, z:-0.00028219117666594684}},
 {joint:joints.Spine, rotation: {x:-0.0000176751273102127, y:-0.003124319249764085, z:0.038534779101610184}},
 {joint:joints.Spine1, rotation: {x:-4.17497290072788e-7, y:-1.677213701256619e-9, z:9.221501784395514e-9}},
 {joint:joints.Neck, rotation: {x:7.651110649108887, y:-0.016224443912506104, z:0.13151095807552338}},
 {joint:joints.Head, rotation: {x:9.753126732903183e-7, y:9.5367431640625e-7, z:-0.07301998138427734}},
 {joint:joints.LeftShoulder, rotation: {x:-4.4276956145949953e-7, y:8.441048180429789e-7, z:-0.000001772323003024212}},
 {joint:joints.LeftShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulder, rotation: {x:0.00004471950887818821, y:-0.000004222378720442066, z:-0.000013855306860932615}},
 {joint:joints.RightShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftArm, rotation: {x:69.93949890136719, y:12.988190650939941, z:39.714332580566406}},
 {joint:joints.LeftForeArm, rotation: {x:7.080487251281738, y:9.689732551574707, z:29.793245315551758}},
 {joint:joints.LeftHand, rotation: {x:8.856789588928223, y:-20.858732223510742, z:-10.042304039001465}},
 {joint:joints.RightArm, rotation: {x:76.07931518554688, y:-16.02501678466797, z:-54.6400032043457}},
 {joint:joints.RightForeArm, rotation: {x:1.0289627313613892, y:-0.5069830417633057, z:-19.718748092651367}},
 {joint:joints.RightHand, rotation: {x:6.883770942687988, y:-3.9376015663146973, z:0.018177060410380363}},
 {joint:joints.LeftUpLeg, rotation: {x:20.88703155517578, y:-15.883438110351562, z:0.0010265837190672755}},
 {joint:joints.LeftLeg, rotation: {x:-23.869232177734375, y:-8.934614181518555, z:-0.0000019445858470135136}},
 {joint:joints.LeftFoot, rotation: {x:0.08056377619504929, y:-9.927420616149902, z:4.963159084320068}},
 {joint:joints.RightUpLeg, rotation: {x:4.9950056076049805, y:3.9711339473724365, z:-0.0003723522531799972}},
 {joint:joints.RightLeg, rotation: {x:-10.93786907196045, y:5.261679172515869, z:0.0000010717330951592885}},
 {joint:joints.RightFoot, rotation: {x:5.942854881286621, y:-5.667943000793457, z:0.00028205709531903267}},
 {joint:joints.LeftEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.RightEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.LeftHandPinky1, rotation: {x:40.63654708862305, y:-0.21107253432273865, z:18.403833389282227}},
 {joint:joints.LeftHandPinky2, rotation: {x:0.000004694138624472544, y:-0.0000016655130821163766, z:-0.0000033542951314302627}},
 {joint:joints.LeftHandPinky3, rotation: {x:-0.000005163712103239959, y:0.000001751219542711624, z:-0.0000016627121794954292}},
 {joint:joints.LeftHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing1, rotation: {x:39.800079345703125, y:-0.03487089276313782, z:9.879484176635742}},
 {joint:joints.LeftHandRing2, rotation: {x:0.000006711739843012765, y:-0.00000712655628376524, z:-0.000006505028977699112}},
 {joint:joints.LeftHandRing3, rotation: {x:0.000004191336756775854, y:0.000005105387117509963, z:-4.194907603505271e-7}},
 {joint:joints.LeftHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandMiddle1, rotation: {x:39.38565444946289, y:-0.0000012385008858473157, z:0.000014395456673810259}},
 {joint:joints.LeftHandMiddle2, rotation: {x:-4.05641508102417, y:0.3774471580982208, z:5.1320414543151855}},
 {joint:joints.LeftHandMiddle3, rotation: {x:5.6164937019348145, y:0.15701861679553986, z:-1.7822577953338623}},
 {joint:joints.LeftHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex1, rotation: {x:34.155487060546875, y:-0.11175765842199326, z:-1.2933320999145508}},
 {joint:joints.LeftHandIndex2, rotation: {x:0.000014470761016127653, y:-0.0000024514697543054353, z:-0.000008425206942774821}},
 {joint:joints.LeftHandIndex3, rotation: {x:0.000004216826710035093, y:0.000001706311081761669, z:-6.49550955245104e-8}},
 {joint:joints.LeftHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb1, rotation: {x:0.0000015762573184474604, y:-0.000002748477072600508, z:-0.0000013436177823678008}},
 {joint:joints.LeftHandThumb2, rotation: {x:2.3644328117370605, y:-0.5487232804298401, z:10.30003833770752}},
 {joint:joints.LeftHandThumb3, rotation: {x:-2.0924696922302246, y:-0.4029260575771332, z:-12.537420272827148}},
 {joint:joints.LeftHandThumb4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky1, rotation: {x:33.44302749633789, y:13.278701782226562, z:-6.222424507141113}},
 {joint:joints.RightHandPinky2, rotation: {x:-4.42792440935591e-7, y:0.0000034147271890105912, z:-3.158827865945568e-8}},
 {joint:joints.RightHandPinky3, rotation: {x:-0.000004913259544991888, y:-0.0000035210537134844344, z:0.00000504609943163814}},
 {joint:joints.RightHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing1, rotation: {x:32.572513580322266, y:13.28342342376709, z:2.065617084503174}},
 {joint:joints.RightHandRing2, rotation: {x:-0.000012815036825486459, y:-0.0000037078114019095665, z:-0.000006676390057691606}},
 {joint:joints.RightHandRing3, rotation: {x:0.000011429883670643903, y:0.000003889683284796774, z:0.0000065729095695132855}},
 {joint:joints.RightHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandMiddle1, rotation: {x:32.183536529541016, y:13.330343246459961, z:11.768068313598633}},
 {joint:joints.RightHandMiddle2, rotation: {x:-4.061400890350342, y:-0.375725656747818, z:-5.110332012176514}},
 {joint:joints.RightHandMiddle3, rotation: {x:5.634244441986084, y:-0.15915340185165405, z:1.7950518131256104}},
 {joint:joints.RightHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex1, rotation: {x:26.942062377929688, y:14.44775390625, z:11.816292762756348}},
 {joint:joints.RightHandIndex2, rotation: {x:0.000009685144505056087, y:0.0000031052902613737388, z:-0.000003731606284418376}},
 {joint:joints.RightHandIndex3, rotation: {x:-0.0000016811942487038323, y:1.284668513790166e-7, z:0.0000034474057883926434}},
 {joint:joints.RightHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb1, rotation: {x:0.000007135924533940852, y:0.0000035432499316812027, z:-0.000003624786813816172}},
 {joint:joints.RightHandThumb2, rotation: {x:2.4335038661956787, y:0.5656800270080566, z:-10.379449844360352}},
 {joint:joints.RightHandThumb3, rotation: {x:-2.0917153358459473, y:0.4010162949562073, z:12.493453025817871}},
 {joint:joints.RightHandThumb4, rotation: {x:0, y:0, z:0}}
 ];

//sitting2
var pose5 =
[   {joint:joints.Hips, rotation: {x:1.1231016117108084e-11, y:9.567315828462597e-10, z:-3.1122908694669604e-8}},
 {joint:joints.Spine, rotation: {x:-0.0000176751273102127, y:-0.003124319249764085, z:0.038534779101610184}},
 {joint:joints.Spine1, rotation: {x:-4.17497290072788e-7, y:-1.677213701256619e-9, z:9.221501784395514e-9}},
 {joint:joints.Neck, rotation: {x:7.652272701263428, y:-0.005135142710059881, z:-0.0005023331614211202}},
 {joint:joints.Head, rotation: {x:-9.974313735961914, y:-8.000004768371582, z:-5.000003814697266}},
 {joint:joints.LeftShoulder, rotation: {x:-4.4276956145949953e-7, y:8.441048180429789e-7, z:-0.000001772323003024212}},
 {joint:joints.LeftShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulder, rotation: {x:0.00004471950887818821, y:-0.000004222378720442066, z:-0.000013855306860932615}},
 {joint:joints.RightShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftArm, rotation: {x:70.00000762939453, y:-0.006416962947696447, z:59.974266052246094}},
 {joint:joints.LeftForeArm, rotation: {x:-19.942136764526367, y:14.961443901062012, z:30.038530349731445}},
 {joint:joints.LeftHand, rotation: {x:-29.98714256286621, y:0.000006718095391988754, z:-0.00000467151403427124}},
 {joint:joints.RightArm, rotation: {x:70.00001525878906, y:-0.000005122642050991999, z:-59.9935417175293}},
 {joint:joints.RightForeArm, rotation: {x:-19.987110137939453, y:-14.99998664855957, z:-20.02568244934082}},
 {joint:joints.RightHand, rotation: {x:-29.97429847717285, y:-0.000007288062988664024, z:0.000002004672069233493}},
 {joint:joints.LeftUpLeg, rotation: {x:86.9999008178711, y:-4.948587894439697, z:-8.5696797214041e-7}},
 {joint:joints.LeftLeg, rotation: {x:-109.9356460571289, y:-4.993561267852783, z:-10.000005722045898}},
 {joint:joints.LeftFoot, rotation: {x:19.961442947387695, y:10.99996566772461, z:11.006425857543945}},
 {joint:joints.RightUpLeg, rotation: {x:86.98057556152344, y:8.974286079406738, z:-0.000002593063982203603}},
 {joint:joints.RightLeg, rotation: {x:-116.93562316894531, y:5.987122535705566, z:10.000000953674316}},
 {joint:joints.RightFoot, rotation: {x:20.96146583557129, y:-3.0192854404449463, z:-5.000009059906006}},
 {joint:joints.LeftEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.RightEye, rotation: {x:0.0, y:0.0, z:0.0}},
 {joint:joints.LeftHandPinky1, rotation: {x:40.63654708862305, y:-0.21107253432273865, z:18.403833389282227}},
 {joint:joints.LeftHandPinky2, rotation: {x:0.000004694138624472544, y:-0.0000016655130821163766, z:-0.0000033542951314302627}},
 {joint:joints.LeftHandPinky3, rotation: {x:-0.000005163712103239959, y:0.000001751219542711624, z:-0.0000016627121794954292}},
 {joint:joints.LeftHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing1, rotation: {x:39.800079345703125, y:-0.03487089276313782, z:9.879484176635742}},
 {joint:joints.LeftHandRing2, rotation: {x:0.000006711739843012765, y:-0.00000712655628376524, z:-0.000006505028977699112}},
 {joint:joints.LeftHandRing3, rotation: {x:0.000004191336756775854, y:0.000005105387117509963, z:-4.194907603505271e-7}},
 {joint:joints.LeftHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandMiddle1, rotation: {x:39.38565444946289, y:-0.0000012385008858473157, z:0.000014395456673810259}},
 {joint:joints.LeftHandMiddle2, rotation: {x:-4.05641508102417, y:0.3774471580982208, z:5.1320414543151855}},
 {joint:joints.LeftHandMiddle3, rotation: {x:5.6164937019348145, y:0.15701861679553986, z:-1.7822577953338623}},
 {joint:joints.LeftHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex1, rotation: {x:34.155487060546875, y:-0.11175765842199326, z:-1.2933320999145508}},
 {joint:joints.LeftHandIndex2, rotation: {x:0.000014470761016127653, y:-0.0000024514697543054353, z:-0.000008425206942774821}},
 {joint:joints.LeftHandIndex3, rotation: {x:0.000004216826710035093, y:0.000001706311081761669, z:-6.49550955245104e-8}},
 {joint:joints.LeftHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb1, rotation: {x:0.0000015762573184474604, y:-0.000002748477072600508, z:-0.0000013436177823678008}},
 {joint:joints.LeftHandThumb2, rotation: {x:2.3644328117370605, y:-0.5487232804298401, z:10.30003833770752}},
 {joint:joints.LeftHandThumb3, rotation: {x:-2.0924696922302246, y:-0.4029260575771332, z:-12.537420272827148}},
 {joint:joints.LeftHandThumb4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky1, rotation: {x:33.44302749633789, y:13.278701782226562, z:-6.222424507141113}},
 {joint:joints.RightHandPinky2, rotation: {x:-4.42792440935591e-7, y:0.0000034147271890105912, z:-3.158827865945568e-8}},
 {joint:joints.RightHandPinky3, rotation: {x:-0.000004913259544991888, y:-0.0000035210537134844344, z:0.00000504609943163814}},
 {joint:joints.RightHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing1, rotation: {x:32.572513580322266, y:13.28342342376709, z:2.065617084503174}},
 {joint:joints.RightHandRing2, rotation: {x:-0.000012815036825486459, y:-0.0000037078114019095665, z:-0.000006676390057691606}},
 {joint:joints.RightHandRing3, rotation: {x:0.000011429883670643903, y:0.000003889683284796774, z:0.0000065729095695132855}},
 {joint:joints.RightHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandMiddle1, rotation: {x:32.183536529541016, y:13.330343246459961, z:11.768068313598633}},
 {joint:joints.RightHandMiddle2, rotation: {x:-4.061400890350342, y:-0.375725656747818, z:-5.110332012176514}},
 {joint:joints.RightHandMiddle3, rotation: {x:5.634244441986084, y:-0.15915340185165405, z:1.7950518131256104}},
 {joint:joints.RightHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex1, rotation: {x:26.942062377929688, y:14.44775390625, z:11.816292762756348}},
 {joint:joints.RightHandIndex2, rotation: {x:0.000009685144505056087, y:0.0000031052902613737388, z:-0.000003731606284418376}},
 {joint:joints.RightHandIndex3, rotation: {x:-0.0000016811942487038323, y:1.284668513790166e-7, z:0.0000034474057883926434}},
 {joint:joints.RightHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb1, rotation: {x:0.000007135924533940852, y:0.0000035432499316812027, z:-0.000003624786813816172}},
 {joint:joints.RightHandThumb2, rotation: {x:2.4335038661956787, y:0.5656800270080566, z:-10.379449844360352}},
 {joint:joints.RightHandThumb3, rotation: {x:-2.0917153358459473, y:0.4010162949562073, z:12.493453025817871}},
 {joint:joints.RightHandThumb4, rotation: {x:0, y:0, z:0}}
 ];

//reading
var pose6 =
[   {joint:joints.Hips, rotation: {x:-42, y:0, z:0}},
    {joint:joints.Spine, rotation: {x:20, y:0, z:0}},
    {joint:joints.Spine1, rotation: {x:10, y:0, z:0}},
    {joint:joints.Neck, rotation: {x:17, y:0, z:0}},
    {joint:joints.Head, rotation: {x:16, y:0, z:2}},
    {joint:joints.LeftShoulder, rotation: {x:-4.4276956145949953e-7, y:8.441048180429789e-7, z:-0.000001772323003024212}},
    {joint:joints.LeftShoulderExtra, rotation: {x:0, y:0, z:0}},
    {joint:joints.RightShoulder, rotation: {x:0.00004471950887818821, y:-0.000004222378720442066, z:-0.000013855306860932615}},
    {joint:joints.RightShoulderExtra, rotation: {x:0, y:0, z:0}},
    {joint:joints.LeftArm, rotation: {x:89, y:-4, z:29}},
    {joint:joints.LeftForeArm, rotation: {x:-35, y:-14, z:89}},
    {joint:joints.LeftHand, rotation: {x:18, y:-23, z:0}},
    {joint:joints.RightArm, rotation: {x:63, y:0, z:-54}},
    {joint:joints.RightForeArm, rotation: {x:-23, y:0, z:-66}},
    {joint:joints.RightHand, rotation: {x:-24, y:79, z:-26}},
    {joint:joints.LeftUpLeg, rotation: {x:89, y:-6, z:0}},
    {joint:joints.LeftLeg, rotation: {x:-80.869232177734375, y:-8.934614181518555, z:-0.0000019445858470135136}},
    {joint:joints.LeftFoot, rotation: {x:0.08056377619504929, y:-9.927420616149902, z:4.963159084320068}},
    {joint:joints.RightUpLeg, rotation: {x:88, y:-12, z:0}},
    {joint:joints.RightLeg, rotation: {x:-79, y:-1, z:-10}},
    {joint:joints.RightFoot, rotation: {x:5.942854881286621, y:-5.667943000793457, z:0.00028205709531903267}},
    {joint:joints.LeftEye, rotation: {x:0, y:0, z:0}},
    {joint:joints.RightEye, rotation: {x:0, y:0, z:0}},
    {joint:joints.LeftHandPinky1, rotation: {x:40.63654708862305, y:-0.21107253432273865, z:18.403833389282227}},
    {joint:joints.LeftHandPinky2, rotation: {x:0.000004694138624472544, y:-0.0000016655130821163766, z:-0.0000033542951314302627}},
    {joint:joints.LeftHandPinky3, rotation: {x:-0.000005163712103239959, y:0.000001751219542711624, z:-0.0000016627121794954292}},
    {joint:joints.LeftHandPinky4, rotation: {x:0, y:0, z:0}},
    {joint:joints.LeftHandRing1, rotation: {x:39.800079345703125, y:-0.03487089276313782, z:9.879484176635742}},
    {joint:joints.LeftHandRing2, rotation: {x:0.000006711739843012765, y:-0.00000712655628376524, z:-0.000006505028977699112}},
    {joint:joints.LeftHandRing3, rotation: {x:0.000004191336756775854, y:0.000005105387117509963, z:-4.194907603505271e-7}},
    {joint:joints.LeftHandRing4, rotation: {x:0, y:0, z:0}},
    {joint:joints.LeftHandMiddle1, rotation: {x:39.38565444946289, y:-0.0000012385008858473157, z:0.000014395456673810259}},
    {joint:joints.LeftHandMiddle2, rotation: {x:-4.05641508102417, y:0.3774471580982208, z:5.1320414543151855}},
    {joint:joints.LeftHandMiddle3, rotation: {x:5.6164937019348145, y:0.15701861679553986, z:-1.7822577953338623}},
    {joint:joints.LeftHandMiddle4, rotation: {x:0, y:0, z:0}},
    {joint:joints.LeftHandIndex1, rotation: {x:34.155487060546875, y:-0.11175765842199326, z:-1.2933320999145508}},
    {joint:joints.LeftHandIndex2, rotation: {x:0.000014470761016127653, y:-0.0000024514697543054353, z:-0.000008425206942774821}},
    {joint:joints.LeftHandIndex3, rotation: {x:0.000004216826710035093, y:0.000001706311081761669, z:-6.49550955245104e-8}},
    {joint:joints.LeftHandIndex4, rotation: {x:0, y:0, z:0}},
    {joint:joints.LeftHandThumb1, rotation: {x:0.0000015762573184474604, y:-0.000002748477072600508, z:-0.0000013436177823678008}},
    {joint:joints.LeftHandThumb2, rotation: {x:2.3644328117370605, y:-0.5487232804298401, z:10.30003833770752}},
    {joint:joints.LeftHandThumb3, rotation: {x:-2.0924696922302246, y:-0.4029260575771332, z:-12.537420272827148}},
    {joint:joints.LeftHandThumb4, rotation: {x:0, y:0, z:0}},
    {joint:joints.RightHandPinky1, rotation: {x:33.44302749633789, y:13.278701782226562, z:-6.222424507141113}},
    {joint:joints.RightHandPinky2, rotation: {x:-4.42792440935591e-7, y:0.0000034147271890105912, z:-3.158827865945568e-8}},
    {joint:joints.RightHandPinky3, rotation: {x:-0.000004913259544991888, y:-0.0000035210537134844344, z:0.00000504609943163814}},
    {joint:joints.RightHandPinky4, rotation: {x:0, y:0, z:0}},
    {joint:joints.RightHandRing1, rotation: {x:32.572513580322266, y:13.28342342376709, z:2.065617084503174}},
    {joint:joints.RightHandRing2, rotation: {x:-0.000012815036825486459, y:-0.0000037078114019095665, z:-0.000006676390057691606}},
    {joint:joints.RightHandRing3, rotation: {x:0.000011429883670643903, y:0.000003889683284796774, z:0.0000065729095695132855}},
    {joint:joints.RightHandRing4, rotation: {x:0, y:0, z:0}},
    {joint:joints.RightHandMiddle1, rotation: {x:32.183536529541016, y:13.330343246459961, z:11.768068313598633}},
    {joint:joints.RightHandMiddle2, rotation: {x:-4.061400890350342, y:-0.375725656747818, z:-5.110332012176514}},
    {joint:joints.RightHandMiddle3, rotation: {x:5.634244441986084, y:-0.15915340185165405, z:1.7950518131256104}},
    {joint:joints.RightHandMiddle4, rotation: {x:0, y:0, z:0}},
    {joint:joints.RightHandIndex1, rotation: {x:26.942062377929688, y:14.44775390625, z:11.816292762756348}},
    {joint:joints.RightHandIndex2, rotation: {x:0.000009685144505056087, y:0.0000031052902613737388, z:-0.000003731606284418376}},
    {joint:joints.RightHandIndex3, rotation: {x:-0.0000016811942487038323, y:1.284668513790166e-7, z:0.0000034474057883926434}},
    {joint:joints.RightHandIndex4, rotation: {x:0, y:0, z:0}},
    {joint:joints.RightHandThumb1, rotation: {x:0.000007135924533940852, y:0.0000035432499316812027, z:-0.000003624786813816172}},
    {joint:joints.RightHandThumb2, rotation: {x:2.4335038661956787, y:0.5656800270080566, z:-10.379449844360352}},
    {joint:joints.RightHandThumb3, rotation: {x:-2.0917153358459473, y:0.4010162949562073, z:12.493453025817871}},
    {joint:joints.RightHandThumb4, rotation: {x:0, y:0, z:0}}
 ];



var startPoseAndTransition =
[ {joint:joints.Hips, rotation: {x:0, y:0, z:0}},
 {joint:joints.Spine, rotation: {x:0, y:0, z:0}},
 {joint:joints.Spine1, rotation: {x:0, y:0, z:0}},
 {joint:joints.Neck, rotation: {x:7, y:0, z:0}},
 {joint:joints.Head, rotation: {x:9, y:0, z:2}},
 {joint:joints.LeftShoulder, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulder, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightShoulderExtra, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftArm, rotation: {x:70, y:-4, z:39}},
 {joint:joints.LeftForeArm, rotation: {x:5, y:-14, z:49}},
 {joint:joints.LeftHand, rotation: {x:-10, y:0, z:0}},
 {joint:joints.RightArm, rotation: {x:70, y:0, z:-54}},
 {joint:joints.RightForeArm, rotation: {x:-29, y:-14, z:-39}},
 {joint:joints.RightHand, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftUpLeg, rotation: {x:99, y:24, z:0}},
 {joint:joints.LeftLeg, rotation: {x:-79, y:-9, z:0}},
 {joint:joints.LeftFoot, rotation: {x:0, y:14, z:4}},
 {joint:joints.RightUpLeg, rotation: {x:84, y:-4, z:0}},
 {joint:joints.RightLeg, rotation: {x:-79, y:4, z:-0}},
 {joint:joints.RightFoot, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftEye, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightEye, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandPinky1, rotation: {x:40, y:0, z:18}},
 {joint:joints.LeftHandPinky2, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandPinky3, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing1, rotation: {x:39, y:0, z:9}},
 {joint:joints.LeftHandRing2, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing3, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandMiddle1, rotation: {x:39, y:0, z:0}},
 {joint:joints.LeftHandMiddle2, rotation: {x:-4, y:0, z:5}},
 {joint:joints.LeftHandMiddle3, rotation: {x:5, y:0, z:-1}},
 {joint:joints.LeftHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex1, rotation: {x:34, y:0, z:-1}},
 {joint:joints.LeftHandIndex2, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex3, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb1, rotation: {x:0, y:0, z:0}},
 {joint:joints.LeftHandThumb2, rotation: {x:2, y:0, z:10}},
 {joint:joints.LeftHandThumb3, rotation: {x:-2, y:0, z:-12}},
 {joint:joints.LeftHandThumb4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky1, rotation: {x:33, y:13, z:-6}},
 {joint:joints.RightHandPinky2, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky3, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandPinky4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing1, rotation: {x:32, y:13, z:2}},
 {joint:joints.RightHandRing2, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing3, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandRing4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandMiddle1, rotation: {x:32, y:13, z:11}},
 {joint:joints.RightHandMiddle2, rotation: {x:-4, y:0, z:-5}},
 {joint:joints.RightHandMiddle3, rotation: {x:5, y:0, z:1}},
 {joint:joints.RightHandMiddle4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex1, rotation: {x:26, y:14, z:11}},
 {joint:joints.RightHandIndex2, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex3, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandIndex4, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb1, rotation: {x:0, y:0, z:0}},
 {joint:joints.RightHandThumb2, rotation: {x:2, y:0, z:-10}},
 {joint:joints.RightHandThumb3, rotation: {x:-2, y:0, z:12}},
 {joint:joints.RightHandThumb4, rotation: {x:0, y:0, z:0}}
];

//position correction of the Poses
var fac1 = { x: -0.0, y: -0.40, z: 0.0};
var fac2 = { x: -0.0, y: -0.75, z: 0.0 };
var fac3 = { x: -0.0, y: -0.75, z: 0.0 };

var startRotation = {x:0.0, y:0.0, z:0.0,w:0.0} ;

function storeStartPoseAndTransition()
{
    var transitionVector=pose[1].rotation;
    for (var i = 0; i < pose.length; i++)
    {
        startRotation = pose4[i].rotation;
        if(sitting==true)
            transitionVector = Vec3.subtract(pose[i].rotation,startRotation);
        else if (meditating==true)
            transitionVector = Vec3.subtract(pose2[i].rotation,startRotation);
        else if (laying==true)
            transitionVector = Vec3.subtract(pose3[i].rotation,startRotation);
        else if (standing==true)
            transitionVector = Vec3.subtract(pose4[i].rotation,startRotation );
        else if (sitting2==true)
            transitionVector = Vec3.subtract(pose5[i].rotation,startRotation );
        else if (reading==true)
            transitionVector = Vec3.subtract(pose6[i].rotation,startRotation );
        startPoseAndTransition[i].joint=pose[i].joint;
        startPoseAndTransition[i].start=startRotation;
        startPoseAndTransition[i].transition=transitionVector;
        
    }
    
}

function updateJoints(factor)
{   //set joint rotation
    for (var i = 0; i < pose.length; i++)
    {   var scaledTransition = Vec3.multiply(startPoseAndTransition[i].transition, factor);
        var rotation = Vec3.sum(startPoseAndTransition[i].start,scaledTransition);
        MyAvatar.setJointData(pose[i].joint, Quat.fromVec3Degrees( rotation ));
        
    }
}

var moveAnimation = function(deltaTime)
{   passedTime += deltaTime;
    
    var factor =1.0;
    if(start==1)
        factor = passedTime/animationLenght;
    if ( passedTime <= animationLenght  )
    {   updateJoints(factor);
        if(standing==true)
            var pos = { x: startPosition.x , y: startPosition.y , z: startPosition.z};
        else if(sitting==true || sitting2==true)
            var pos = { x: startPosition.x + fac1.x * factor, y: startPosition.y +fac1.y * factor, z: startPosition.z+fac1.z*factor};
        else if(meditating==true)
            var pos = { x: startPosition.x + fac2.x * factor, y: startPosition.y +fac2.y * factor, z: startPosition.z+fac2.z*factor};
        else if(laying==true|| reading==true)
            var pos = { x: startPosition.x + fac3.x * factor, y: startPosition.y +fac3.y * factor, z: startPosition.z+fac3.z*factor};
        else
            var pos= homePosition;
        MyAvatar.position = pos;
    }
    else
    {
        
        Script.update.disconnect(moveAnimation);
    }
}

function clearfunction()
{   laying=false;
    sitting=false;
    meditating=false;
    standing=false;
    sitting2=false;
    reading=false;
    
}

function move()
{   passedTime = 0.0;
    MyAvatar.clearReferential();
    try
    {
        Script.update.disconnect(moveAnimation);
    }
    catch (e){}
    storeStartPoseAndTransition();
    Script.update.connect(moveAnimation);
}

function startPos()
{   startPosition=MyAvatar.position;
    if(sitting==true || sitting2==true)
    {   startPosition.x=startPosition.x-fac1.x;
        startPosition.y=startPosition.y-fac1.y;
        startPosition.z=startPosition.z-fac1.z;
    }
    else if(meditating==true)
    {   startPosition.x=startPosition.x-fac2.x;
        startPosition.y=startPosition.y-fac2.y;
        startPosition.z=startPosition.z-fac2.z;
    }
    else if(laying==true ||reading==true)
    {   startPosition.x=startPosition.x-fac3.x;
        startPosition.y=startPosition.y-fac3.y;
        startPosition.z=startPosition.z-fac3.z;
    }
}

function findstool()
{   var ids = Entities.findEntities(MyAvatar.position, 40);
    for (var i = 0; i < ids.length; i++)
    {
        var id = ids[i];
        var properties=Entities.getEntityProperties(id);
        if (properties.name=="Stool" && sitting==true)
        {    print("name:" +properties.modelURL);
            var position=properties.position;
            var dimensions=properties.dimensions;
			position.y=position.y+dimensions.y+0.25;
            var rotation=properties.rotation;
             MyAvatar.goToLocation (position, true, properties.rotation, false);
            i=ids.length;
            print("position" +position.x + " y  " +position.y +" z " +position.z +"rotation" +rotation.x +" y "+rotation.y +" z " +rotation.z);
            MyAvatar.position=position;
            startPos();
        }
        else if (properties.name=="Stool2" && sitting2==true)
        {    print("name:" +properties.modelURL);
            var position=properties.position;
            var dimensions=properties.dimensions;
            position.y=position.y+dimensions.y+0.25;
            var rotation=properties.rotation;
            MyAvatar.goToLocation (position, true, properties.rotation, false);
            i=ids.length;
            print("position" +position.x + " y  " +position.y +" z " +position.z +"rotation" +rotation.x +" y "+rotation.y +" z " +rotation.z);
            MyAvatar.position=position;
            startPos();
        }
        else if (properties.name=="Bed" && laying==true)
        {    print("name:" +properties.modelURL);
            var position=properties.position;
            var dimensions=properties.dimensions;
            position.y=position.y+dimensions.y+0.25;
            var rotation=properties.rotation;
            MyAvatar.goToLocation (position, true, properties.rotation, false);
            i=ids.length;
            print("position" +position.x + " y  " +position.y +" z " +position.z +"rotation" +rotation.x +" y "+rotation.y +" z " +rotation.z);
            MyAvatar.position=position;
            startPos();
        }
        else if (properties.name=="Mat" && meditating==true)
        {    print("name:" +properties.modelURL);
            var position=properties.position;
            var dimensions=properties.dimensions;
            position.y=position.y+dimensions.y+0.10;
            var rotation=properties.rotation;
            MyAvatar.goToLocation (position, true, properties.rotation, false);
            i=ids.length;
            print("position" +position.x + " y  " +position.y +" z " +position.z +"rotation" +rotation.x +" y "+rotation.y +" z " +rotation.z);
            MyAvatar.position=position;
            startPos();
        }
        else if (properties.name=="Couch" && reading==true)
        {    print("name:" +properties.modelURL);
            var position=properties.position;
            var dimensions=properties.dimensions;
            position.y=position.y+dimensions.y+0.10;
            var rotation=properties.rotation;
            MyAvatar.goToLocation (position, true, properties.rotation, false);
            i=ids.length;
            print("position" +position.x + " y  " +position.y +" z " +position.z +"rotation" +rotation.x +" y "+rotation.y +" z " +rotation.z);
            MyAvatar.position=position;
            startPos();
        }
    }
}

Controller.mousePressEvent.connect(function(event)
{
    var clickedOverlay = Overlays.getOverlayAtPoint({x: event.x, y: event.y});
    if(start==0)
    {   homePosition=MyAvatar.position;
        start=1;
    }
    if (clickedOverlay == poseButton)
    {   if(poseButtons==0)
        {   Overlays.editOverlay(sitDownButton, { visible: true });
            Overlays.editOverlay(meditateButton, { visible: true });
            Overlays.editOverlay(sit2DownButton, { visible: true });
            Overlays.editOverlay(standingButton, { visible: true });
            Overlays.editOverlay(layDownButton, { visible: true });
            Overlays.editOverlay(readingButton, { visible: true });
            poseButtons=1;
        }
        else
        {   Overlays.editOverlay(sitDownButton, { visible: false });
            Overlays.editOverlay(meditateButton, { visible: false });
            Overlays.editOverlay(sit2DownButton, { visible: false });
            Overlays.editOverlay(standingButton, { visible: false });
            Overlays.editOverlay(layDownButton, { visible: false });
            Overlays.editOverlay(readingButton, { visible: false });
            poseButtons=0;
        }
    }
    else if (clickedOverlay == sitDownButton)
    {   startPos();
        clearfunction();
        standing=true;
        move();
        clearfunction();
        sitting=true;
        findstool();
        move();
        print("sit:" );
    }
    else if (clickedOverlay == meditateButton)
    {   startPos();
        clearfunction();
        standing=true;
        move();
        clearfunction();
        meditating=true;
        findstool();
        move();
        print("meditate:" );
    }
    else if (clickedOverlay == layDownButton)
    {   startPos();
        clearfunction();
        standing=true;
        move();
        clearfunction();
        laying=true;
        findstool();
        move();
        print("lay:" );
    }
    else if (clickedOverlay == standingButton)
    {   startPos();
        clearfunction();
        standing=true;
        move();
        clearfunction();
        standing=true;
        move();
        print("stand:" );
    }
    else if (clickedOverlay == sit2DownButton)
    {   startPos();
        clearfunction();
        standing=true;
        move();
        clearfunction();
        sitting2=true;
        findstool();
        move();
        print("sit2:" );
    }
    else if (clickedOverlay == readingButton)
    {   startPos();
        clearfunction();
        standing=true;
        move();
        clearfunction();
        reading=true;
        findstool();
        move();
        print("read:" );
    }
    
});

function scriptEnding()
{
    startPos();
    MyAvatar.position=startPosition;
    MyAvatar.clearReferential();
    for (var i = 0; i < pose.length; i++)
    {
        MyAvatar.clearJointData(pose[i].joint);
    }
    Overlays.deleteOverlay(sitDownButton);
    Overlays.deleteOverlay(meditateButton);
    Overlays.deleteOverlay(layDownButton);
    Overlays.deleteOverlay(standingButton);
    Overlays.deleteOverlay(sit2DownButton);
    Overlays.deleteOverlay(readingButton);
    Overlays.deleteOverlay(poseButton);
}

Script.scriptEnding.connect(scriptEnding);
//Controller.keyPressEvent.connect(keyPressEvent);

