Dim BrowserExecutable, oShell, counter

Reporter.ReportEvent micDone, "Setting SnapshotReportMode", "Setting the value to 0 so as to always log snapshots"
Setting("SnapshotReportMode") = 0 														'always captures images

Set oShell = CreateObject ("WSCript.shell")													'Instantiate the ability to run a command in the OS
oShell.run "powershell -command ""Start-Service mediaserver"""							'Statement to start the mediaserver
Set oShell = Nothing																		'Clear the variable for the shell

While Browser("CreationTime:=0").Exist(0)   													'Loop to close all open browsers
	Browser("CreationTime:=0").Close 														'Statement to close the first browser UFT One can see
Wend
BrowserExecutable = Parameter.Item("BrowserName") & ".exe"								'Set the browser from the data table
SystemUtil.Run BrowserExecutable,"","","",3												'launch the browser specified in the data table
Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AIUtil.SetContext AppContext																'Tell the AI engine to point at the application
AIUtil.Context.SetBrowserScope(BrowserWindow)
AIUtil("close", micAnyText, micFromLeft, 1).CheckExists TRUE
AIUtil.Context.SetBrowserScope(WebPage)
AppContext.ClearCache																		'Clear the browser cache to ensure you're getting the latest forms from the application
AppContext.Navigate Parameter.Item("URL") 												'Navigate to the application URL
AppContext.Maximize																		'Maximize the application to give the best chance that the fields will be visible on the screen
counter = 0
While Browser("CreationTime:=" & counter).Exist(0)
	Reporter.ReportEvent micDone, "Checking Browser Open", "Browser " & counter & " is open"
	counter = counter + 1
Wend
'AppContext.Sync																			'Wait for the browser to stop spinning

