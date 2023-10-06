Dim UnitStatus

Select Case Parameter.Item("Status")
	Case "Pass"
		UnitStatus = micPass
	Case "Fail"
		UnitStatus = micFail
	Case "Warning"
		UnitStatus = micWarning
	Case Else
		UnitStatus = micDone
End Select

Reporter.ReportEvent UnitStatus, Parameter.Item("Step_Name"), Parameter.Item("Step_Description")
