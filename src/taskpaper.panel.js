;$(function($){
  
  $.extend($.fn, {
    
    create_panel: function(title, width) {
    	var self = this;

    	$('.qe-panel').remove();
    	var drag, event;
    	var left = self.event.pageX;
    	var top = self.event.pageY;

    	var panel	= $('<div></div>').hide().addClass('qe-panel').css({left: left, top: top});
    	$('<div></div>')
    		.addClass('qe-panel-title')
    		.html(title)
    		.append($("<a class='close' href='#'>X</a>")
    		.click( function() { panel.remove(); return false; }))
    		.mousedown( function() { drag = true; return false; })
    		.mouseup( function() { drag = false; return false; })
    		.mousemove( 
    			function(e) {
    				if(drag && event) {
    					left -= event.pageX - e.pageX;
    					top -=  event.pageY - e.pageY;
    					panel.css( {left: left, top: top} ); 
    				}

    				event = e;
    				return false;
    			} 
    		)
    		.appendTo(panel);

    	if(width)
    		panel.width(width);

    	self.append(panel);
    	return panel;
    }
    		
  })
  
})

