function taskpaperResults(taskpaper){
	if(taskpaper) this.parse(taskpaper);
};

taskpaperResults.prototype = {
  
  version: '0.1',
  taskpaper: '',
  tasks: [],
  items: [],
  types: ['pending', 'complete', 'waiting'],
  itemtypes: ['project', 'task', 'note'],
  tags: ['todo', 'pending', 'done', 'email'],
  taskDelimiter: '-',
  projectDelimiter: ':',
	
	parse: function(taskpaper){
		
		var result = parent = task = this;
		
		result.taskpaper = taskpaper;
		result.tasks = taskpaper.split('\n');
		
		var parent_depth = 0
					
		$(result.tasks).each( function() {	  
        
      	var session = new taskpaperItem();
      
    	  session.type = result.getType(this)
        session.text = this.valueOf(); // split returns the string in an array form so return using valueOf()
        
        if (session.type == 'project') {

          session.items = []
          var depth = result.hasDepth(this)
          
          if (parent_depth == depth) {
            parent.items.push(session)
            task = session
          } else {
            parent = task
            parent.items.push(session)
            task = session            
            parent_depth = depth
          } 
          
       } else {
          task.items.push(session)
       }
        

    });

	},
	
	isSibling: function(item, parent){
	  
	},
	
	getType: function(item){
	  if (this.isProject(item)) return 'project'
	  if (this.isTask(item))    return 'task'
	  return 'note'
 	},
	
	isNote: function(item){
	  return false
	},
	
	isTask : function(item) {	 
	  for (var i=0; i < item.length; i++) {  // return if the first character with whitespace is a '-'
	    if (item[i] == '-') return true
	    if (this.isWhitespace(item[i])) continue
	  };
	  return false
	},
	
	isWhitespace: function(val){
	  return (val.charCodeAt(0) == 32 || val.charCodeAt(0) == 9)
	},
	
	hasTag: function(item){
	  return false
	},
	
	isProject: function(item){
	  return (item[item.length-1] == ':') // a project is a colon at the end of the line
	},
	
	hasDepth: function(item){
	  for (var i=0; i < item.length; i++) {  
	    if (!this.isWhitespace(item[i])) return i
	  };
	  return 0  
	},
	
}
