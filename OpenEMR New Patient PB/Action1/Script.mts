'Declare variables that will be used in the script
Dim BrowserExecutable

'Loop to close all open browsers
While Browser("CreationTime:=0").Exist(0)   													
	Browser("CreationTime:=0").Close 
Wend

'Set the BrowserExecutable variable to be the .exe for the browser declared in the datasheet
BrowserExecutable = Parameter.Item("Browser") & ".exe"

'Launch the browser specified in the data table
SystemUtil.Run BrowserExecutable,"","","",3			

Set AppContext = Browser("CreationTime:=0")

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
IsVisible = Browser("OpenEMR Login").Page("OpenEMR Login").WebButton("No Thanks").GetROProperty("visible")
If IsVisible Then
	Browser("OpenEMR Login").Page("OpenEMR Login").WebButton("No Thanks").Click
End If

'Set Props = Browser("OpenEMR Login").Page("OpenEMR Login").WebButton("No Thanks").GetAllROProperties
'' Props contains the properties of the button and their current values
'NumberOfProperties = Props.Count
'For i = 0 To NumberOfProperties - 1
'    Print Props(i).Name & ": " & Props(i).Value
'Next

Browser("OpenEMR Login").Page("OpenEMR Login").WebEdit("authUser").Check CheckPoint("Username") @@ script infofile_;_ZIP::ssf1.xml_;_
Browser("OpenEMR Login").Page("OpenEMR Login").WebEdit("clearPass").Check CheckPoint("Password") @@ script infofile_;_ZIP::ssf2.xml_;_
Browser("OpenEMR Login").Page("OpenEMR Login").WebButton("Login").Check CheckPoint("Login") @@ script infofile_;_ZIP::ssf3.xml_;_

