import { dragToGoBack } from 'drag-to-go-back';

Template.item2.onRendered(function() {

  const self = this;

  dragToGoBack.init();

  //Remember scroll position
  scrollHistory(self.$('.content'), [tabHistory.goingBack, tabView.fromTab]);

});
