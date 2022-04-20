
Set SAPGuiWindowContext = SAPGuiSession("Session").SAPGuiWindow("SAP Easy Access")				'Set the WindowContext to make the script more readable

SAPGuiWindowContext.SAPGuiButton("Log off   (Shift+F3)").Click									'Logoff of SAP
SAPGuiSession("Session").SAPGuiWindow("Log Off").SAPGuiButton("Yes").Click						'Click the Yes button on the logoff dialog screen

