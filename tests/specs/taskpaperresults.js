describe('I need to be able to populate the taskpaper results object', {
  
  'before all': function() {
    
    taskpaper = 'Personal:\n- @email Sam McDowell re: lunch @due(2008-12-22)\nBusiness:\n- review credit card for online services @online'
    feed = new taskpaperResults(taskpaper);
    
    todo = feed.items
    proj1 = todo[0]
    proj2 = todo[1]
	},
	
	'after all': function(){

	},
	
	'should be at version 0.1': function(){
	  value_of(feed.version).should_be('0.1')
	},
	
	'should have four tasks': function(){
	  value_of(feed.tasks.length).should_be('4')
	},

	'should two projects (at the top level)': function(){
      value_of(todo.length).should_be(2)
	},
	
	'should have for each project one task': function(){
	  value_of(proj1.items.length).should_be(1)
    value_of(proj2.items.length).should_be(1)
	},
	
	'should be able read proj1 items with one task': function(){
      value_of(proj1.text).should_be('Personal:')
      value_of(proj1.type).should_be('project')
      value_of(proj1.items.length).should_be(1)
	},

	'should be able read two items but with only one task': function(){
    value_of(proj1.items[0].text).should_be('- @email Sam McDowell re: lunch @due(2008-12-22)')
    value_of(proj2.items[0].text).should_be('- review credit card for online services @online')
	},
	
	'should set the default status to pending': function(){
	  value_of(proj1.result).should_be('pending')
	  value_of(proj1.items[0].result).should_be('pending')
	  value_of(proj2.items[0].result).should_be('pending')
	},
	
	'should correctly return isProject with string ending in colon Prospect:': function(){
	  value_of(feed.isProject("Prospect:")).should_be_true()
	  value_of(feed.isProject("Prospect")).should_be_false()
	},
	
	'should correctly return isTask with string beginning with - regardless of preceeding spaces': function(){
	  value_of(feed.isTask("- a task")).should_be_true()
	  value_of(feed.isTask("a task")).should_be_false()
	  value_of(feed.isTask(" - a task")).should_be_true()
	  value_of(feed.isTask("  - a task")).should_be_true()
	},
	
	'should return the correct type as type': function(){
	  value_of(feed.getType("Prospect:")).should_be('project')
	  value_of(feed.getType("-Prospect")).should_be('task')
	  value_of(feed.getType("Prospect")).should_be('note')
	},
	
	'should return type note if not project or task': function(){
	  value_of(feed.getType("this hasn't got a colon or a dash")).should_be('note')
	},
	
	'should return correct depth 0, 1 , 3 and empty lines as 0': function(){
	  value_of(feed.hasDepth("")).should_be(0)
	  value_of(feed.hasDepth(" ")).should_be(0)
	  value_of(feed.hasDepth("      ")).should_be(0)
	  value_of(feed.hasDepth("Project:")).should_be(0)
	  value_of(feed.hasDepth(" project:")).should_be(1)
	  value_of(feed.hasDepth("   project:")).should_be(3)
	  value_of(feed.hasDepth("- item")).should_be(0)
	  value_of(feed.hasDepth(" - item")).should_be(1)
	  value_of(feed.hasDepth("   - item")).should_be(3)
	  
	  var str = 'project\n project'
	  var arr = str.split('\n')
	  value_of(feed.hasDepth(arr[0])).should_be(0)
    value_of(feed.hasDepth(arr[1])).should_be(1)
	},
		
})