/*

The HTML page must include the following code:
________________________________________

<link rel="stylesheet" type="text/css" href="css/volume.css">

<script>
var max_ht = 999;

function initProgram() {
vol_level = 0.8;  // Set to your own preference (0 to 1.0).
document.getElementById('myVideo').volume = vol_level;

initVolume();

// Position the volume holder. Replace 999 with left coordinate.

document.getElementById('vol_holder').style.left = '999px';
}
</script>

<div id='vol_holder'>
  <div class='disp' id='vol_ro'></div>
  <div id='volume_trackbar'>
    <div id='volume_track_top'>
      <div id='knob'></div>
    </div>
  </div>
</div>

<script src='js/volume.js'></script>
________________________________________

The 'js/volume.js' tag must be at the bottom of the body code.

The call to the 'initVolume()' function must be made 
in the HTML page, either from an onload command 
within a body tag or from within a <script>...</script>.

If your video Id is anything other than 'myVideo',
you need to perform a Search/Replace in this js code, 
and Save the changes.

*/

var vol_level = 0.9;
var isShown = new Boolean();  // Volume Slider

var IE = document.all?true:false;

if (!IE) document.captureEvents(Event.MOUSEMOVE);

var container = document.getElementById("vol_holder");
container.onmousemove = getMouseXY;                         // Displays only when cursor is inside container!
document.onmousemove = getMouseXY;                          // Displays when cursor is anywhere on the screen!

var tempX = 0, tempY = 0, tempL = 0, tempT = 0, tempV = vol_level * 100;

function getMouseXY(e)
{
  if (IE)
  { 
    tempX = event.clientX + document.body.scrollLeft;
    tempY = event.clientY + document.body.scrollTop;
    tempL = tempX - container.offsetLeft;
    tempT = tempY - container.offsetTop;
  } 
  else 
  {  
    tempX = e.pageX;
    tempY = e.pageY;
    tempL = tempX - container.offsetLeft;
    tempT = tempY - container.offsetTop;
  }  

/*
  document.Show.MouseX.value = tempX;
  document.Show.MouseY.value = tempY;
  document.Show.offset_left.value = tempL;  // tempX - container.offsetLeft;
  document.Show.offset_top.value = tempT;   //container.offsetTop;
*/

      return true;
}

// Start, Move, Stop Dragging.

function initVolumeBar() {
volume_bar = document.getElementById('volume_trackbar');
volume_bar.addEventListener('mousedown', startVolumeSlide, false);	
volume_bar.addEventListener('mouseup', stopVolumeSlide, false);

volume_knob = document.getElementById('knob');
volume_knob.addEventListener('mousedown', startVolumeSlide, false);	
volume_knob.addEventListener('mouseup', stopVolumeSlide, false);
}
 
function startVolumeSlide(e) {
if(tempT > 19 && tempT < 121) tempV = 120 - tempT;

// document.Show.show_vol.value = tempV;

volume_bar.addEventListener('mousemove', moveVolumeSlide, false);	
volume_knob.addEventListener('mousemove', moveVolumeSlide, false);

document.getElementById('volume_track_top').style.height = 100 - tempV;
document.getElementById('knob').style.top = 100 - tempV - 4;
document.getElementById('vol_ro').innerHTML='' + tempV;

vol_level = tempV * 0.01;
document.getElementById('video1').volume=vol_level;
}
 
function moveVolumeSlide(e) {
if(tempT > 19 && tempT < 121 && tempL > 7 && tempL <17) tempV = 120 - tempT
else {
volume_bar.removeEventListener('mousemove', moveVolumeSlide, false);
volume_knob.removeEventListener('mousemove', moveVolumeSlide, false);
}

// document.Show.show_vol.value = tempV;

document.getElementById('volume_track_top').style.height = 100 - tempV;
document.getElementById('knob').style.top = 100 - tempV - 4;
document.getElementById('vol_ro').innerHTML='' + tempV;

vol_level = tempV * 0.01;
document.getElementById('video1').volume=vol_level;
}

function stopVolumeSlide(e) {
// document.Show.show_vol.value = tempV;

volume_bar.removeEventListener('mousemove', moveVolumeSlide, false);
volume_knob.removeEventListener('mousemove', moveVolumeSlide, false);

document.getElementById('volume_track_top').style.height = 100 - tempV;
document.getElementById('knob').style.top = 100 - tempV - 4;
document.getElementById('vol_ro').innerHTML='' + tempV;

vol_level = tempV * 0.01;
document.getElementById('video1').volume=vol_level;
}

function show_hide_vol() {
if(isShown) {
document.getElementById("vol_holder").style.display = "none";
isShown = false;
}
else {
var h = video1.videoHeight;
if(h < max_ht) document.getElementById("vol_holder").style.top = h - 90
else document.getElementById("vol_holder").style.top = max_ht - 90;  // max-height 400 - 90
document.getElementById("vol_holder").style.display="inherit";
isShown = true;
}
}

function initVolume() {
document.getElementById("vol_holder").style.display = "none";
isShown=false;

initVolumeBar();
document.getElementById('volume_track_top').style.height = 100 - (vol_level * 100);
document.getElementById('knob').style.top = 100 - (vol_level * 100) - 2;

ro = vol_level * 100;
document.getElementById('vol_ro').innerHTML = '' + ro;
}
