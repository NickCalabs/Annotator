var widgets = require('sdk/widget');
var data = require('sdk/self').data;
var pageMod = require('sdk/page-mod');
var selectors = [];

function detachWorker(worker, workerArray){
	var index = workerArray.indexOf(worker);
	if(index != -1) {
		workerArray.splice(index, 1);
	}
}

function activateSelectors(){
	selectors.forEach(
		function (selector){
			selector.postMessage(annotatorIsOn);
	});
}

function toggleActivation(){
	annotatorIsOn = !annotatorIsOn;
	activateSelectors();
	return annotatorIsOn;
}


var annotatorIsOn = false;

function toggleActivation() {
  annotatorIsOn = !annotatorIsOn;
  return annotatorIsOn;
}

exports.main = function() {

  var widget = widgets.Widget({
    id: 'toggle-switch',
    label: 'Annotator',
    contentURL: data.url('widget/pencil-off.png'),
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('widget/widget.js')
  });

  widget.port.on('left-click', function() {
    console.log('activate/deactivate');
    widget.contentURL = toggleActivation() ?
              data.url('widget/pencil-on.png') :
              data.url('widget/pencil-off.png');
  });

  widget.port.on('right-click', function() {
      console.log('show annotation list');
  });
}

var selector = pageMod.PageMod({
	include:[*],
	contentScriptWhen: 'ready',
	contentScriptFile: [data.url('jquery.min.js'),
											data.url('selector.js')]
	onAttach: function(worker){
		worker.postMessage(annotatorIsOn);
		selector.push(worker);
		worker.port.on('show', function(data){
			console.log(data);
		});
		worker.on('detach', function() {
			detachWorker(this, selectors);
		});
	}											
});



















