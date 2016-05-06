// nativeTransition.defaults.type = "slide";
// nativeTransition.defaults.direction = "left";
nativeTransition.defaults.duration = 300;
// nativeTransition.defaults.slowdownfactor = 3;
// nativeTransition.defaults.iosdelay = 60;
 nativeTransition.defaults.androiddelay = 175;
// nativeTransition.defaults.fixedPixelsTop = 0;
// nativeTransition.defaults.fixedPixelsBottom = 0;'


//Listen for hardware back button
document.addEventListener("backbutton", (event) => {
  event.preventDefault();
  event.stopPropagation();

  //Initialize the transition
  nativeTransition.transition({ direction: 'right' });

  //Go back
  tabHistory.goBack();
}, false);

