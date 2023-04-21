Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("profile").Click																		'Click the profile icon
AIUtil("input", "Username").CheckExists True
AIUtil("input", "Username").SetText Parameter.Item("UserName")							'Set the passed in parameter UserName into the Username input
AIUtil("input", "Password").SetText Parameter.Item("Password")								'Set the passed in parameter Password into the Password input
AIUtil("button", "SIGN IN").Click																'Click the SIGN IN button
