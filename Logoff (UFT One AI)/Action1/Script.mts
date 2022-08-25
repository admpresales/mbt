Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("profile").Click																		'Click the profile icon
AIUtil.FindTextBlock("Sign out").Click														'Click the Sign out text
AppContext.Close																			'Close the browser
