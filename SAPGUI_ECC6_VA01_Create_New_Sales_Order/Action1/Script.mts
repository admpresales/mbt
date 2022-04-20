'===========================================================
'Function to Create a Random Number with DateTime Stamp
'===========================================================
Function fnRandomNumberWithDateTimeStamp()

'Find out the current date and time
Dim sDate : sDate = Day(Now)
Dim sMonth : sMonth = Month(Now)
Dim sYear : sYear = Year(Now)
Dim sHour : sHour = Hour(Now)
Dim sMinute : sMinute = Minute(Now)
Dim sSecond : sSecond = Second(Now)

'Create Random Number
fnRandomNumberWithDateTimeStamp = Int(sDate & sMonth & sYear & sHour & sMinute & sSecond)

End Function
'======================== End Function =====================

Dim PONumber, OrderNumber

PONumber = "PO" & fnRandomNumberWithDateTimeStamp

Set SAPGuiWindowContext = SAPGuiSession("Session").SAPGuiWindow("Create Sales Order: Initial")	'Set the WindowContext to make the script more readable

SAPGuiWindowContext.SAPGuiEdit("Order Type").Set Parameter.Item("OrderType")	'Set the order type, could be data driven from datasheet or a parameter @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf2.xml_;_
SAPGuiWindowContext.SAPGuiEdit("Sales Organization").Set Parameter.Item("SalesOrg")	'Set the Sales Org, could be data driven from datasheet or a parameter @@ hightlight id_;_2_;_script infofile_;_ZIP::ssf2.xml_;_
SAPGuiWindowContext.SAPGuiEdit("Distribution Channel").Set Parameter.Item("DistributionChannel")	'Set the Dist. Channel, could be data driven from datasheet or a parameter @@ hightlight id_;_3_;_script infofile_;_ZIP::ssf2.xml_;_
SAPGuiWindowContext.SAPGuiEdit("Division").Set Parameter.Item("Division")	'Set the Devision, could be data driven from datasheet or a parameter @@ hightlight id_;_4_;_script infofile_;_ZIP::ssf2.xml_;_
SAPGuiWindowContext.SAPGuiEdit("Division").SetFocus												'Ensure focus is on the Division field @@ hightlight id_;_4_;_script infofile_;_ZIP::ssf2.xml_;_
SAPGuiWindowContext.SAPGuiButton("Enter").Click													'Click the "Enter" SAP GUI button @@ hightlight id_;_5_;_script infofile_;_ZIP::ssf2.xml_;_

Set SAPGuiWindowContext = SAPGuiSession("Session").SAPGuiWindow("Create ZTA Standard Order:")	'Set the WindowContext to make the script more readable

SAPGuiWindowContext.SAPGuiEdit("PO Number").Set PONumber										'Enter the PO Number (calculated with the random number function)
SAPGuiWindowContext.SAPGuiEdit("Sold-to party").Set Parameter.Item("Sold-toParty") 				'Enter the Sold-to number, could be data driven from datasheet or a parameter @@ hightlight id_;_2_;_script infofile_;_ZIP::ssf3.xml_;_
SAPGuiWindowContext.SAPGuiEdit("Ship-to party").Set Parameter.Item("Ship-toParty")	'Enter the Ship-to nuber, could be data driven from datasheet or a parameter @@ hightlight id_;_3_;_script infofile_;_ZIP::ssf3.xml_;_
SAPGuiWindowContext.SAPGuiEdit("PO Number").SetFocus											'Ensure the focus is on the PO Number field @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf3.xml_;_
SAPGuiWindowContext.SendKey ENTER																'Hit the Enter key to submit the data currently on the form @@ hightlight id_;_0_;_script infofile_;_ZIP::ssf3.xml_;_
SAPGuiWindowContext.SAPGuiTable("All items").SetCellData 1,"Material", Parameter.Item("Material1")	'Enter in the material number for the first line, could be data driven from datasheet or a parameter @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf4.xml_;_
SAPGuiWindowContext.SAPGuiTable("All items").SetCellData 1,"Order Quantity", Parameter.Item("OrderQuantity1")	'Enter the Quantity for the first line, could be data driven from datasheet or a parameter @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf4.xml_;_
SAPGuiWindowContext.SAPGuiTable("All items").SelectCell 1,"Order Quantity"						'Keep focus in the Order Quantity field, step could be removed, just showing how to do it @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf4.xml_;_
SAPGuiWindowContext.SAPGuiButton("Enter").Click													'Click the check/submit SAP GUI button @@ hightlight id_;_2_;_script infofile_;_ZIP::ssf4.xml_;_

If SAPGuiSession("Session").SAPGuiWindow("Open quotations for item").Exist(5) Then
	SAPGuiSession("Session").SAPGuiWindow("Open quotations for item").SAPGuiButton("Continue").Click
End If

SAPGuiSession("Session").SAPGuiWindow("ZTA Standard Order: Availabili").SAPGuiButton("Continue").Click	'Click the Continue button on the availability screen @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf5.xml_;_
SAPGuiWindowContext.SAPGuiStatusBar("StatusBar").Sync											'Wait for the StatusBar to finish @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf6.xml_;_
SAPGuiWindowContext.SAPGuiButton("Save   (Ctrl+S)").Click										'Click the SAPGUI Save button @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf7.xml_;_
SAPGuiSession("Session").SAPGuiWindow("Create ZTA Standard Order:_2").SAPGuiStatusBar("StatusBar").Sync	'Wait for the StatusBar to finish @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf8.xml_;_
SAPGuiSession("Session").SAPGuiWindow("Save Incomplete Document").SAPGuiButton("Save").Click	'Click the "Save" button on the pop-up window @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf9.xml_;_
SAPGuiWindowContext.SAPGuiStatusBar("StatusBar").Sync											'Wait for the StatusBar to finish @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf10.xml_;_

'===========================================================
'	The below statements will show different ways to output the order number from the status bar text.
'		There are other ways to handle outputs (e.g. with the datasheet, writing to a database table).
'		1 - As an Output from a Checkpoint (stored in the Object Repository)
'		2 - As a variable that could be used in the script
'		3 - As an Output Parameter for use when calling the Action
'		4 - Saving the output value on the data table for reuse later, FYI - this only impacts the RUNTIME version of the datatable
'===========================================================
SAPGuiWindowContext.SAPGuiStatusBar("StatusBar").Output CheckPoint("StatusBar")					'Output the order number as a checkpoint @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf11.xml_;_
OrderNumber = SAPGuiSession("Session").SAPGuiWindow("Create ZTA Standard Order:").SAPGuiStatusBar("StatusBar").GetROProperty("item2") ' Output the order number as a variable
Parameter("OP_OrderNumber") = OrderNumber														'Output the OrderNumber as an Output Parameter
DataTable.Value("dtOrderNumber","Global") = OrderNumber

SAPGuiWindowContext.SAPGuiButton("Exit   (Shift+F3)").Click										'Exit the TCode @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf12.xml_;_

