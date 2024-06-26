AIUtil.SetContext Browser("creationtime:=0")
AIUtil("button", "Save").Click
AIUtil("check_mark").Click
Set OutboundDeliveryMessage = AIRegex("Outbound Delivery \d+ was saved and")
AIUtil.FindTextBlock("Help").Click
If AIUtil.FindTextBlock(OutboundDeliveryMessage).Exist(0) Then
	print "Outbound delivery message has multiple statements"
Else
	Set OutboundDeliveryMessage = AIRegex("Outbound Delivery \d+ has been saved")
	If AIUtil.FindTextBlock(OutboundDeliveryMessage).Exist(0) Then
		print "Outbound deliver message is just ...has been saved."	
	Else
		msgbox "No outbound delivery message detected on the pop-up page, inspect the application."
	End If
End If
AIUtil.FindTextBlock(OutboundDeliveryMessage).CheckExists True
DeliveryMessage = AIUtil.FindTextBlock(OutboundDeliveryMessage).GetText
DeliveryMessageArray = Split(DeliveryMessage," ")
DeliveryNumber = DeliveryMessageArray(2)
print "Delivery number is " & DeliveryMessageArray(2)
DataTable.Value("DeliveryNumber") = DeliveryMessageArray(2)
Parameter.Item("DeliveryNumber") = DeliveryMessageArray(2)
Reporter.ReportEvent micDone, "Delivery Number", "The Deliver Number from the popup window is " & DeliveryMessageArray(2) & "."

AIUtil("check_mark").Click
