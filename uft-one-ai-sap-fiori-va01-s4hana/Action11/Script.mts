AIUtil.SetContext Browser("creationtime:=0")
If Parameter.Item("OrderNumber") = "Default" Then
	Parameter.Item("OrderNumber") = DataTable.Value("OrderNumber")
End If
AIUtil("text_box", "Order:").SetText Parameter.Item("OrderNumber")
AIUtil("button", "Continue").Click
Browser("creationtime:=0").Sync																			'Wait for the browser to stop spinning

AIUtil.FindTextBlock("Outbound Delivery Create: Overview").CheckExists True
