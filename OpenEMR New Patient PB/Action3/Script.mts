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

'===========================================================================================
'BP:  Navigate to the New/Search Patient screen
'===========================================================================================

Browser("OpenEMR").Page("OpenEMR").WebElement("New/Search").Click @@ script infofile_;_ZIP::ssf1.xml_;_

'===========================================================================================
'BP:  Enter in the new patient information
'===========================================================================================
Parameter.Item("NewPatientEmail") = fnRandomNumberWithDateTimeStamp & "@opentext.com"
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebEdit("form_fname").Set Parameter.Item("NewPatientFirstName")
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebEdit("form_mname").Set Parameter.Item("NewPatientMiddleName") @@ script infofile_;_ZIP::ssf3.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebEdit("form_lname").Set Parameter.Item("NewPatientLastName") @@ script infofile_;_ZIP::ssf4.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebEdit("form_DOB").Set Parameter.Item("NewPatientDOB") @@ script infofile_;_ZIP::ssf5.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebList("form_sex").Select Parameter.Item("NewPatientSex") @@ script infofile_;_ZIP::ssf6.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebButton("Contact").Click @@ script infofile_;_ZIP::ssf7.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebEdit("form_email_direct").Set Parameter.Item("NewPatientEmail") @@ script infofile_;_ZIP::ssf8.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebEdit("form_email").Set Parameter.Item("NewPatientEmail") @@ script infofile_;_ZIP::ssf9.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebButton("Choices").Click @@ script infofile_;_ZIP::ssf10.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebList("form_allow_patient_portal").Select "YES" @@ script infofile_;_ZIP::ssf11.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame").WebButton("Create New Patient").Click @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("OpenEMR").Page("OpenEMR_2").Frame("modalframe").WebButton("Confirm Create New Patient").Click
'===========================================================================================
'BP:  Setup Patient Portal Access
'===========================================================================================

Browser("OpenEMR").Page("OpenEMR").Frame("Frame_2").Link("Patient Portal / API Access").Click @@ script infofile_;_ZIP::ssf14.xml_;_
Browser("OpenEMR").Page("OpenEMR").Frame("Frame_2").WebButton("Create").Click @@ script infofile_;_ZIP::ssf15.xml_;_
Parameter.Item("NewPatientPassword") = Browser("OpenEMR").Page("OpenEMR").Frame("modalframe").WebEdit("Password").GetROProperty("Value")
Parameter.Item("NewPatientLogin") = Parameter.Item("NewPatientEmail")
Browser("OpenEMR").Page("OpenEMR").Frame("modalframe").WebButton("Save").Click
'Browser("OpenEMR").Sync
rc = Browser("OpenEMR").InsightObject("InsightObject").Exist(10)
Browser("OpenEMR").InsightObject("InsightObject").Click

'AIUtil.SetContext Browser("creationtime:=0")
'AIUtil.Context.SetBrowserScope(BrowserWindow)
'AIUtil("button", "Cancel").Click
'AIUtil.Context.SetBrowserScope(WebPage)

Browser("OpenEMR").Page("OpenEMR").WebButton("Close").Click
DataTable.Value("NewPatientPassword") = Parameter.Item("NewPatientPassword")
DataTable.Value("NewPatientLogin") = Parameter.Item("NewPatientEmail")
DataTable.Value("NewPatientEmail") = Parameter.Item("NewPatientEmail")
print "The new patient login is " & Parameter.Item("NewPatientLogin")
print "The NewPatientEmail parameter value is " & Parameter.Item("NewPatientEmail")
print "The new patient password is " & Parameter.Item("NewPatientPassword")

