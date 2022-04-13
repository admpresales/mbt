' Click the Trashcan icon to delete whatever order has been selected
'This action must start after a Search Order has been completed.
'This action needs to start on the ORDER DETAILS screen

' If we're not on the ORDER DETAILS screen then we failed previously so exit
If NOT WpfWindow("Micro Focus MyFlight Sample").WpfObject("ORDER DETAILS").Exist Then @@ hightlight id_;_1905290200_;_script infofile_;_ZIP::ssf7.xml_;_
	Reporter.ReportEvent micFail, "Trashcan Order - Wrong screen", "Not on ORDER DETAILS screen. Exiting..."
	ExitAction
End  If

'If the Trashcan icon is not enabled then exit
If WpfWindow("Micro Focus MyFlight Sample").WpfButton("WpfButton").GetROProperty("enabled") = "True" Then @@ hightlight id_;_2058186184_;_script infofile_;_ZIP::ssf1.xml_;_
	WpfWindow("Micro Focus MyFlight Sample").WpfButton("WpfButton").Click
	WpfWindow("Micro Focus MyFlight Sample").Dialog("Notification").WinButton("Yes").Click @@ hightlight id_;_2753606_;_script infofile_;_ZIP::ssf2.xml_;_
	
	Wait 2 ' The Exist statement below seems to find a little box that exists if we run too fast - so the Wait is necessary
	
	' Wait for Deleted message to appear (about 3-4 seconds) 
	If WpfWindow("Micro Focus MyFlight Sample").WpfObject("OrderDeletedMessage").Exist (4) Then
		WpfWindow("Micro Focus MyFlight Sample").WpfObject("OrderDeletedMessage").Output CheckPoint("OrderDeletedNumber") @@ hightlight id_;_2137223792_;_script infofile_;_ZIP::ssf3.xml_;_
	End  If
Else
	Reporter.ReportEvent micFail, "Trashcan Order - Trashcan not enabled", "Trashcan icon not enabled. Exiting..."
	ExitAction
End  If

' Flight app ends on BOOK FLIGHT screen with FIND FLIGHTS button available

