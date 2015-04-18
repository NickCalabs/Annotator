this.addEventListener('click', function(event){
	if(event.button == 0 && event.shiftkey == false)
		self.port.emit('left-click');

	if(event.button == 2 || (event.button == 0 && event.shiftkey == true))
		self.port.emit('right-click');
	event.preventDefault();
}, true);