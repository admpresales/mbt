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

'Tell the AI engine to point at the application
AIUtil.SetContext AppContext											

AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Username")).SetText Parameter.Item("UserName")
AIUtil.Context.Freeze
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Password")).SetText Parameter.Item("Password")
Set textbox= AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("E-Mail Address"))
Set combobox= AIUtil("combobox", "", micWithAnchorOnLeft, AIUtil.FindTextBlock("E-Mail Address"))
If textbox.Exist(0) Then

    textbox.SetText Parameter.Item("Email")
Else 

    combobox.SetText Parameter.Item("Email")
End If
AIUtil.Scroll "down", 1
'AIUtil("button", "Log In").Click
Browser("Patient Portal Login").Page("Patient Portal Login").WebButton("Log In").Click
AIUtil.Context.UnFreeze
AIUtil("text_box", "Password", micWithAnchorOnLeft, AIUtil.FindTextBlock("Current")).SetText Parameter.Item("Password")
AIUtil.SetContext Browser("CreationTime:=0")
AIUtil.Context.Freeze
'DJ20240909 UX change, handling new UX
If AIUtil.FindTextBlock("New", micFromTop, 1).Exist(0) Then
	AIUtil("text_box", "Password", micWithAnchorOnLeft, AIUtil.FindTextBlock("New", micFromTop, 1)).SetText Parameter.Item("NewPassword")
Else
	AIUtil("text_box", "New Password").SetText Parameter.Item("NewPassword")
End If
If AIUtil.FindTextBlock("New", micFromBottom, 1).Exist(0) Then
	AIUtil("text_box", "Confirm", micWithAnchorOnLeft, AIUtil.FindTextBlock("New", micFromBottom, 1)).SetText Parameter.Item("NewPassword")
Else
	AIUtil("text_box", "Confirm New").SetText Parameter.Item("NewPassword")
End If
If AIUtil("text_box", "Confirm", micWithAnchorOnLeft, AIUtil.FindTextBlock("Email")).Exist(0) Then
	AIUtil("text_box", "Confirm", micWithAnchorOnLeft, AIUtil.FindTextBlock("Email")).SetText Parameter.Item("UserName")
Else
	
	AIUtil("text_box", "Confirm Email").SetText Parameter.Item("UserName")
End If
AIUtil("button", "Log In").Click
AIUtil.Context.UnFreeze
If AIUtil("down_triangle", micAnyText, micWithAnchorOnRight, AIUtil.FindTextBlock("Reports")).Exist(0) Then
	AIUtil("down_triangle", micAnyText, micWithAnchorOnRight, AIUtil.FindTextBlock("Reports")).Click
End If
AIUtil.FindText("Logout").Click
AIUtil.FindTextBlock("You have been successfully logged out.").CheckExists True
DataTable.Value("NewPatientPassword") = Parameter.Item("NewPassword")

AppContext.Close
