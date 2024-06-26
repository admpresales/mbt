Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil.Table.Cell(1, 0).SetText DataTable.Value("DeliveryNumber")
AIUtil("button", "Save").Click

Set OrderConfirmationMessage = AIRegex("Document \d+ has been saved")
AIUtil.FindTextBlock(OrderConfirmationMessage).CheckExists TRUE
AIUtil("check_mark", micAnyText, micWithAnchorOnRight, AIUtil("button", "Save")).CheckExists True
'StatusBarText = AIUtil.FindTextBlock(micAnyText, micWithAnchorOnLeft, AIUtil("check_box", micAnyText, micWithAnchorOnRight, AIUtil("button", "Save"))).GetText
StatusBarText = AIUtil.FindTextBlock(micAnyText, micWithAnchorOnLeft, AIUtil("check_mark")).GetText
StatusBarArray = Split(StatusBarText," ")
print "The Billing Number is " & StatusBarArray(1)
Parameter("BillingNumber") = StatusBarArray(1)
DataTable.Value("BillingNumber") = StatusBarArray(1)
Reporter.ReportEvent micDone, "Billing Number", "The Billing Number from the Status Bar is " & StatusBarArray(1) & "."

AIUtil.FindTextBlock("Exit").Click
Set ResultsMessage = AIRegex("Results (\d+)")
AIUtil.FindTextBlock(ResultsMessage).CheckExists True
AIUtil("left_triangle").Click
Browser("creationtime:=0").Sync																			'Wait for the browser to stop spinning

