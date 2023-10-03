Dim BrowserExecutable, oShell

Setting("SnapshotReportMode") = 0 														'always captures images
While Browser("CreationTime:=0").Exist(0)   													'Loop to close all open browsers
	Browser("CreationTime:=0").Close 														'Statement to close the first browser UFT One can see
Wend
BrowserExecutable = Parameter.Item("BrowserName") & ".exe"								'Set the browser from the data table
SystemUtil.Run BrowserExecutable,"","","",3												'launch the browser specified in the data table
Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AppContext.ClearCache																		'Clear the browser cache to ensure you're getting the latest forms from the application
AppContext.Navigate Parameter.Item("URL") 												'Navigate to the application URL
AppContext.Maximize																		'Maximize the application to give the best chance that the fields will be visible on the screen
AppContext.Sync																			'Wait for the browser to stop spinning

