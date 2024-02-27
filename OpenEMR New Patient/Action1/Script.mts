'Declare variables that will be used in the script
Dim BrowserExecutable, oShell

'Statements to ensure that the OCR service that the AI Object Detection (AIOD) utilizes is running on the machine
Set oShell = CreateObject ("WSCript.shell")
oShell.run "powershell -command ""Start-Service mediaserver"""
Set oShell = Nothing

'Loop to close all open browsers
While Browser("CreationTime:=0").Exist(0)   													
	Browser("CreationTime:=0").Close 
Wend

'Set the BrowserExecutable variable to be the .exe for the browser declared in the datasheet
BrowserExecutable = Parameter.Item("Browser") & ".exe"

'Launch the browser specified in the data table
SystemUtil.Run BrowserExecutable,"","","",3												

'Set the variable for what application (in this case the browser) we are acting upon
Set AppContext=Browser("CreationTime:=0")												

'Clear the browser cache to ensure you're getting the latest forms from the application
AppContext.ClearCache																		

'===========================================================================================
'BP:  Nav to the login URL of the application
'===========================================================================================
AppContext.Navigate Parameter.Item("URL")	

'Maximize the application to give the best chance that the fields will be visible on the screen
AppContext.Maximize																		

'Wait for the browser to stop spinning
AppContext.Sync																			

'Tell the AI engine to point at the application
AIUtil.SetContext AppContext																

'===========================================================================================
'BP:  Verify that the username and password fields and Login button appear
'===========================================================================================
If AIUtil.FindTextBlock("OpenEMR Product Registration").Exist(0) Then
	AIUtil("button", "No Thanks").Click	
End If
AIUtil("text_box", "Username").CheckExists True
AIUtil.Context.Freeze
AIUtil("text_box", "Password").CheckExists True
AIUtil("button", "Login").CheckExists True
AIUtil.Context.UnFreeze


'Close the application at the end of your script
'AppContext.Close																			
