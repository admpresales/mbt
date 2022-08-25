Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("shopping_cart").Hover
AIUtil.RunSettings.AutoScroll.Disable
While AIUtil("close", micAnyText, micFromTop, 1).Exist(0)
	AIUtil("close", micAnyText, micFromTop, 1).Click
Wend
AIUtil.RunSettings.AutoScroll.Enable "down", 2

