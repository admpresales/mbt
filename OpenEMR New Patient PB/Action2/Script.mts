'===========================================================================================
'BP:  Login
'===========================================================================================

Browser("OpenEMR Login").Page("OpenEMR Login").WebEdit("Username Field").Set Parameter.Item("Username")
Browser("OpenEMR Login").Page("OpenEMR Login").WebEdit("Password Field").Set Parameter.Item("Password")
Browser("OpenEMR Login").Page("OpenEMR Login").WebButton("Login Button").Click @@ script infofile_;_ZIP::ssf3.xml_;_
If Browser("OpenEMR").Page("OpenEMR").WebElement("user_icon").GetROProperty("visible") Then
	Reporter.ReportEvent micPass, "Profile Icon Check", "The Profile Icon is being displayed, validating login success."
Else
	Reporter.ReportEvent micFail, "Profile Icon Check", "The Profile Icon is not being displayed, login failure."
End If

