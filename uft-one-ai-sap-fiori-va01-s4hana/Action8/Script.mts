Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("profile").Click
AIUtil("power").Click
AIUtil.FindText("Sign Out").Click
AIUtil.FindTextBlock("OK").Click
AppContext.Close																			'Close the application at the end of your script
