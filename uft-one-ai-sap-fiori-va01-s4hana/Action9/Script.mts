Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

'set objSendKey=CreateObject("WScript.shell")
'objSendKey.SendKeys "{F11}"

AIUtil("button", "Save").Click
AppContext.Sync																			'Wait for the browser to stop spinning
Set OrderConfirmationMessage = AIRegex("Standard Order \d+ has been saved")
AIUtil.FindTextBlock(OrderConfirmationMessage).CheckExists TRUE
AIUtil("check_mark", micAnyText, micWithAnchorOnRight, AIUtil("button", "Save")).CheckExists True
'StatusBarText = AIUtil.FindTextBlock(micAnyText, micWithAnchorOnLeft, AIUtil("check_box", micAnyText, micWithAnchorOnRight, AIUtil("button", "Save"))).GetText
StatusBarText = AIUtil.FindTextBlock(micAnyText, micWithAnchorOnLeft, AIUtil("check_mark")).GetText
StatusBarArray = Split(StatusBarText," ")
print "The Order number is " & StatusBarArray(2)
Parameter("NewOrderNumber") = StatusBarArray(2)
DataTable.Value("OrderNumber") = StatusBarArray(2)
Reporter.ReportEvent micDone, "Order Number", "The Order Number from the Status Bar is " & StatusBarArray(2) & "."
