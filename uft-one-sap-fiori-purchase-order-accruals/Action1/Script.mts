Dim BrowserExecutable, rc, oShell, counter

Set oShell = CreateObject ("WSCript.shell")
oShell.run "powershell -command ""Start-Service mediaserver"""
Set oShell = Nothing

While Browser("CreationTime:=0").Exist(0)   													'Loop to close all open browsers
	Browser("CreationTime:=0").Close 
Wend
BrowserExecutable = Parameter.Item("BrowserName") & ".exe"
SystemUtil.Run BrowserExecutable,"","","",3												'launch the browser specified in the data table
Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AppContext.ClearCache																		'Clear the browser cache to ensure you're getting the latest forms from the application
AppContext.Navigate Parameter.Item("URL")												'Navigate to the application URL
AppContext.Maximize																		'Maximize the application to give the best chance that the fields will be visible on the screen
AppContext.Sync																			'Wait for the browser to stop spinning
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

'===========================================================================================
'BP:  Open the Fiori Launchpad.
'		User: S4H_FIN_DEM, Password: Welcome1
'===========================================================================================

AIUtil("text_box", "User").Type Parameter.Item("UserName")
AIUtil("text_box", "Password").Type Parameter.Item("Password")
AIUtil("button", "Log On").Click
counter = 0
Do
	AIUtil.RunSettings.AutoScroll.Disable
	counter = counter + 1
	wait(1)
	If counter >= 10 Then
		Reporter.ReportEvent micFail, "Login", "The search icon (magnifying glass) didn't show up within " & counter & " tries, failing test"
		AIUtil.RunSettings.AutoScroll.Enable "down", 2
		ExitAction
	End If
Loop Until AIUtil("search").Exist

AIUtil.RunSettings.AutoScroll.Enable "down", 2
