'===========================================================================================
'Logic Step:  If running from UFT One, the parameters should be the default, if running from VEFT, they should be set from previous unit
'===========================================================================================
If Parameter.Item("Email") = "FromPreviousOutputParam" Then
	Parameter.Item("Email") = DataTable.Value("NewPatientEmail")
End If

If Parameter.Item("Password") = "FromPreviousOutputParam" Then
	Parameter.Item("Password") = DataTable.Value("NewPatientPassword")
End If

If Parameter.Item("UserName") = "FromPreviousOutputParam" Then
	Parameter.Item("UserName") = DataTable.Value("NewPatientLogin")
End If

If Parameter.Item("PermanentPassword") = "FromPreviousOutputParam" Then
	Parameter.Item("PermanentPassword") = "Password1"
End If

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
AppContext.Navigate Parameter.Item("PatientPortalURL")	

'Maximize the application to give the best chance that the fields will be visible on the screen
AppContext.Maximize																		

'Wait for the browser to stop spinning
AppContext.Sync																			

Browser("Patient Portal Login").Page("Patient Portal Login").WebEdit("Username").Set Parameter.Item("UserName")
Browser("Patient Portal Login").Page("Patient Portal Login").WebEdit("Password").Set Parameter.Item("Password")
Browser("Patient Portal Login").Page("Patient Portal Login").WebEdit("Email Address").Set Parameter.Item("Email")
Browser("Patient Portal Login").Page("Patient Portal Login").WebButton("Log In").Click

Browser("Patient Portal Login").Page("Patient Portal Login_2").WebEdit("Current Password").Set Parameter.Item("Password")
Browser("Patient Portal Login").Page("Patient Portal Login_2").WebEdit("New Password").Set Parameter.Item("PermanentPassword")
Browser("Patient Portal Login").Page("Patient Portal Login_2").WebEdit("Confirm New Password").Set Parameter.Item("PermanentPassword")
Browser("Patient Portal Login").Page("Patient Portal Login_2").WebEdit("Confirm Email").Set Parameter.Item("Email")
Browser("Patient Portal Login").Page("Patient Portal Login_2").WebButton("Log In").Click

'DJ20240909 Handling UX change, Logout is no longer buried in a menu.
If Browser("Patient Portal Login").Page("Home | OpenEMR Portal").WebButton("User Menu Drop Down").Exist(0) Then
	Browser("Patient Portal Login").Page("Home | OpenEMR Portal").WebButton("User Menu Drop Down").Click
End If
Browser("Patient Portal Login").Page("Home | OpenEMR Portal").Link("Logout").Click

AppContext.Close

