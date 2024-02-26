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


AIUtil.SetContext Browser("CreationTime:=0")

'===========================================================================================
'BP:  Navigate to the New/Search Patient screen
'===========================================================================================

AIUtil.FindText("Patient").Hover

AIUtil.FindTextBlock("New/Search").Click

'===========================================================================================
'BP:  Enter in the new patient information
'===========================================================================================

'AIUtil.Context.Freeze
AIUtil("text_box", "Name:", micWithAnchorOnLeft, AIUtil.FindTextBlock("First Name")).SetText Parameter.Item("NewPatientFirstName")
AIUtil("text_box", "Middle").SetText Parameter.Item("NewPatientMiddleName")
AIUtil("text_box", "Last Name").SetText Parameter.Item("NewPatientLastName")
AIUtil("combobox", "Sex:").Select Parameter.Item("NewPatientSex")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("DOB:")).SetText Parameter.Item("NewPaitientDOB")
AIUtil.FindTextBlock("DOB:").Click
AIUtil.FindTextBlock("Contact").Click
AIUtil.Scroll "down", 5
Parameter.Item("NewPatientEmail") = fnRandomNumberWithDateTimeStamp & "@opentext.com"
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Trusted Email:")).SetText Parameter.Item("NewPatientEmail")
AIUtil.Scroll "down", 5
AIUtil("button", "Create New Patient").Click
AIUtil.FindText("Confirm Create New Patient").Click

'===========================================================================================
'BP:  Setup Patient Portal Access
'===========================================================================================

AIUtil.SetContext Browser("CreationTime:=0")
AIUtil.FindTextBlock("Create", micWithAnchorAbove, AIUtil.FindTextBlock("Credentials")).Click
Parameter.Item("NewPatientLogin") = AIUtil("text_box", "Account Name:").GetValue
'msgbox Parameter.Item("NewPatientLogin")
Parameter.Item("NewPatientPassword") = Browser("OpenEMR").Page("OpenEMR").Frame("modalframe").WebEdit("pwd").GetROProperty("Value")
'msgbox Parameter.Item("NewPatientPassword")
AIUtil("button", "Save").Click
AIUtil.Context.SetBrowserScope(BrowserWindow)
AIUtil("button", "Cancel").Click
AIUtil.Context.SetBrowserScope(WebPage)
AIUtil("button", "Close").Click

