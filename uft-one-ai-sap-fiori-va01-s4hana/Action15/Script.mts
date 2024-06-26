Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

If Parameter.Item("DeliveryNumber") = "Default" Then
	Parameter.Item("DeliveryNumber") = DataTable.Value("DeliveryNumber")
End If

AIUtil("text_box", "Outbound Delivery:").SetText Parameter.Item("DeliveryNumber")
AIUtil("button", "Continue").Click

AIUtil.FindTextBlock("Outbound Delivery " & DataTable.Value("DeliveryNumber") & " Change: Overview").CheckExists True

