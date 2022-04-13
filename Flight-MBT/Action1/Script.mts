'Login to the Flight GUI WPF application using the 2 passed in parameters
'Default values: Username (Agent Name) = John, Password = hp 

a=Parameter("Username")
b=Parameter("Password")

'Start the Flight GUI Appolication
SystemUtil.Run "C:\Program Files (x86)\Micro Focus\UFT One\samples\Flights Application\FlightsGUI.exe"

If WpfWindow("Micro Focus MyFlight Sample").Exist Then
	WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set a @@ hightlight id_;_1950327744_;_script infofile_;_ZIP::ssf2.xml_;_
	WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").Set b @@ hightlight id_;_2137164136_;_script infofile_;_ZIP::ssf3.xml_;_
	WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click
Else
	Reporter.ReportEvent micFail, "Login - Flight GUI not found", "Flight GUI application window not found. Exiting..."
	ExitTest
End If
 @@ hightlight id_;_1950326688_;_script infofile_;_ZIP::ssf4.xml_;_
 @@ hightlight id_;_2100371504_;_script infofile_;_ZIP::ssf28.xml_;_
 ' Flight GUI app ends on post-login screen that shows BOOK FLIGHT and SEARCH ORDER
 'This action can then transition to either Book Flight or Search Order
