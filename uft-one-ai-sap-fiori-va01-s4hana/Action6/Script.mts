Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

If Parameter.Item("Item") = "Default" Then
	Parameter.Item("Item") = DataTable.Value("Item", "05_va01_order_details")
End If

If Parameter.Item("Material") = "Default" Then
	Parameter.Item("Material") = DataTable.Value("Material", "05_va01_order_details")
End If

If Parameter.Item("OrderQuantity") = "Default" Then
	Parameter.Item("OrderQuantity") = DataTable.Value("OrderQuantity", "05_va01_order_details")
End If

If Parameter.Item("UnitOfMeasure") = "Default" Then
	Parameter.Item("UnitOfMeasure") = DataTable.Value("UnitOfMeasure", "05_va01_order_details")
End If

AIUtil("plus").Click
AIUtil("search", micAnyText, micFromBottom, 1).CheckExists True
'the automation keeps overrunning the application
wait 1
set objSendKey=CreateObject("WScript.shell")
objSendKey.SendKeys "+{TAB}"
objSendKey.SendKeys Parameter.Item("Item")
objSendKey.SendKeys "{TAB}"
objSendKey.SendKeys Parameter.Item("Material")
objSendKey.SendKeys "{TAB}"
objSendKey.SendKeys "{TAB}"
objSendKey.SendKeys Parameter.Item("OrderQuantity")
objSendKey.SendKeys "{TAB}"
objSendKey.SendKeys Parameter.Item("UnitOfMeasure")

