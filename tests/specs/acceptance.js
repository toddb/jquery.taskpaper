describe('TaskPaper knows about four things: projects, tasks, notes, and tags. As you type, these items are auto-formatted so that your lists are easier to read.', {

  'To create a task, type a line starting with a dash followed by a space': function(){
    value_of(this).should_fail("TODO")  
   },
 
  'To create a project, type a line ending with a colon': function(){
    value_of(this).should_fail("TODO")  
  },

  'Any line that isnt a task or project is a note': function(){
    value_of(this).should_fail("TODO")  
  },

  'To create a tag, type "@" followed by a name anywhere in a project, task, or note': function(){
    value_of(this).should_fail("TODO")  
  },

})

describe('You use these basic parts in any way that you like. TaskPaper doesnt force a particular system on you; it provides the basic to-do list elements and then you use them as you see fit', {

  'To mark a task as done click on the dash handle in front of the task and a "@done" tag will be added': function(){
    value_of(this).should_fail("TODO")  
  },

  'To filter on a single project click the arrow handle next to the project name': function(){
    value_of(this).should_fail("TODO")  
  },
  
  'To filter on any part of the application use the filter box with "project=" or "@tag"': function(){
    value_of(this).should_fail("TODO")      
  },

  'To drag and drop tasks click and drag on the handle in front of the entry': function(){
    value_of(this).should_fail("TODO")  
  },

  'To show an overview list of your projects choose the menu item "View > Show Projects List"': function(){
    value_of(this).should_fail("TODO")  
  },

  'To quickly enter a task, project or note in a project thats not visible use the "Quick Entry Window"': function(){
    value_of(this).should_fail("TODO")  
  },

  'To associate a value with a tag, add it in parentheses after the tag. For example @priority(1)': function(){
    value_of(this).should_fail("TODO")  
  },

})

describe('These are additional parts that add functionality', function(){

  'To change fonts and colors use the "Theme Options" popup in Preferences': function(){
    value_of(this).should_fail("TODO")  
  },
	
})

describe('Business rules': function(){
  
  'The filter shows red when a "(" is placed after a @tag': function(){},
  
  'Any line's formatting changes when ":" or "-\w" is used in that order': function(){},
  
  'Only one level of projects is available from the main menu': function(){},
  
  'Nested projects occur through the Quick Entry Window': function(){},
  
  
})