Function fnRandomNumberWithDateTimeStamp()

'Find out the current date and time
Dim sDate : sDate = Day(Now)
Dim sMonth : sMonth = Month(Now)
Dim sYear : sYear = Year(Now)
Dim sHour : sHour = Hour(Now)
Dim sMinute : sMinute = Minute(Now)
Dim sSecond : sSecond = Second(Now)

fnRandomNumberWithDateTimeStamp = Int(sDate & sMonth & sYear & sHour & sMinute & sSecond)
'======================== End Function =====================
End Function

Dim counter, Anchor

AIUtil.SetContext Browser("CreationTime:=0")

'===========================================================================================
'BP:  Navigate to the New/Search Patient screen
'===========================================================================================
counter = 0
Do
	AIUtil.FindText("Patient").Hover
	counter = counter + 1
	If counter >= 10 Then
		Reporter.ReportEvent micFail, "Find New/Search Text", "The New/Search text wasn't found after trying to hover over Patient " & counter & " times."
		ExitTest
	End If
Loop While (AIUtil.FindTextBlock("New/Search").Exist(0) = FALSE)

AIUtil.FindTextBlock("New/Search").Click

'===========================================================================================
'BP:  Enter in the new patient information
'===========================================================================================


Set Anchor = AIUtil.FindTextBlock("Name:")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor).SetText Parameter.Item("NewPatientFirstName")
AIUtil.Context.Freeze
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor).Click
Set Anchor = AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor)
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor).SetText Parameter.Item("NewPatientMiddleName")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor).Click
Set Anchor = AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor)
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor).SetText Parameter.Item("NewPatientLastName")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, Anchor).Click
AIUtil("combobox", "Sex:").Select Parameter.Item("NewPatientSex")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindText("DOB")).SetText Parameter.Item("NewPaitientDOB")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindText("DOB")).Click
AIUtil.Context.UnFreeze
AIUtil.FindTextBlock("Contact").Click
AIUtil.Scroll "down", 5
Parameter.Item("NewPatientEmail") = fnRandomNumberWithDateTimeStamp & "@opentext.com"
print "The NewPatientEmail parameter value is " & Parameter.Item("NewPatientEmail")
DataTable.Value("NewPatientEmail") = Parameter.Item("NewPatientEmail")
print "The value in the datatable for NewPatientEmail is " & DataTable.Value("NewPatientEmail")
AIUtil.Context.Freeze
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Trusted Email:")).SetText Parameter.Item("NewPatientEmail")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Trusted Email:")).Click
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Contact Email:")).SetText Parameter.Item("NewPatientEmail")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Contact Email:")).Click
AIUtil.Context.UnFreeze
AIUtil.Scroll "down", 5
AIUtil.FindTextBlock("Choices").Click
AIUtil.Scroll "down", 1
AIUtil("combobox", "Allow Patient Portal:").Select "YES"
AIUtil.Scroll "down", 10
AIUtil("button", "Create New Patient").Click
counter = 0
While AIUtil.FindText("Confirm Create New Patient").Exist(0) = FALSE
	AIUtil.ScrollOnObject AIUtil.Table, "down", 1
	counter = counter + 1
	If counter >= 100 Then
		Reporter.ReportEvent micFail, "Find Confirm Create New Patient Button", "The Confirm Create New Patient Button wasn't found after trying to scroll " & counter & " times."
		ExitTest
	End If
Wend
AIUtil.FindText("Confirm Create New Patient").Click

'===========================================================================================
'BP:  Setup Patient Portal Access
'===========================================================================================

AIUtil.SetContext Browser("CreationTime:=0")
counter = 0
While  (AIUtil.FindTextBlock("Credentials").Exist(0) = FALSE)
	AIUtil.FindText("Patient Portal / API Access").Click
	'Add hover to profile as the underline when hovered over the text in the previous statement causes the standard OCR to not find the text on the next iteration
	AIUtil("profile", micAnyText, micFromTop, 1).Hover
	counter = counter + 1
	If counter >= 10 Then
		Reporter.ReportEvent micFail, "Find Credentials Text", "The Credentials text wasn't found after trying to expand Patient Portal / API Access " & counter & " times."
		ExitTest
	End If
Wend
AIUtil.FindTextBlock("Create", micWithAnchorAbove, AIUtil.FindTextBlock("Credentials")).Click
'The patient login is the e-mail, not the patient account name in the patient portal
'Parameter.Item("NewPatientLogin") = AIUtil("text_box", "Account Name:").GetValue
Parameter.Item("NewPatientLogin") = Parameter.Item("NewPatientEmail")
print "The new patient login is " & Parameter.Item("NewPatientLogin")
DataTable.Value("NewPatientLogin") = Parameter.Item("NewPatientLogin")
print "The value in the datatable for NewPatientLogin is " & DataTable.Value("NewPatientLogin")
Parameter.Item("NewPatientPassword") = Browser("OpenEMR").Page("OpenEMR").Frame("modalframe").WebEdit("pwd").GetROProperty("Value")
print "The new patient password is " & Parameter.Item("NewPatientPassword")
DataTable.Value("NewPatientPassword") = Parameter.Item("NewPatientPassword")
print "The value in the datatable for NewPatient Password is " & DataTable.Value("NewPatientPassword")
AIUtil("button", "Save").Click
AIUtil.Context.SetBrowserScope(BrowserWindow)
AIUtil("button", "Cancel").Click
AIUtil.Context.SetBrowserScope(WebPage)
AIUtil("button", "Close").Click

