import { dragToGoBack } from 'drag-to-go-back'

Template.item.onRendered(function() {

  const self = this;

  dragToGoBack();

  //Remember scroll position
  scrollHistory(self.$('.content'), [tabHistory.goingBack, tabView.fromTab]);

});
