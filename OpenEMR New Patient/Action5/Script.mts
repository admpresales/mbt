If Parameter.Item("UserName") = "FromPreviousOutputParam" Then
	Parameter.Item("UserName") = DataTable.Value("NewPatientLogin")
	print "The UserName parameter is set to the default value, using the datasheet value instead."
End If

If Parameter.Item("Password") = "FromPreviousOutputParam" Then
	Parameter.Item("Password") = DataTable.Value("NewPatientPassword")
	print "The Password parameter is set to the default value, using the datasheet value instead."
End If

If Parameter.Item("Email") = "FromPreviousOutputParam" Then
	Parameter.Item("Email") = DataTable.Value("NewPatientEmail")
	print "The Email parameter is set to the default value, using the datasheet value instead."
End If


AIUtil.SetContext Browser("creationtime:=0")
Browser("creationtime:=0").Navigate Parameter.Item("PatientPortalURL")

