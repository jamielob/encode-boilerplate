import { dragToGoBack } from 'drag-to-go-back';

dragToGoBack.configure({
  onComplete: () => {
    Meteor.defer(() => {
      nativeTransition.transition({ direction: "right", fixedPixelsTop: 50, fixedPixelsBottom: 50, duration: 300 });
      tabHistory.goBack();
    });
  }
});