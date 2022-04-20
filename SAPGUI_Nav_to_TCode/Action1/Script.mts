
Set SAPGuiWindowContext = SAPGuiSession("Session").SAPGuiWindow("SAP Easy Access")				'Set the WindowContext to make the script more readable.  This makes the keyword view LESS readable though.

SAPGuiWindowContext.Maximize																	'Maximize the SAP GUI window @@ hightlight id_;_0_;_script infofile_;_ZIP::ssf1.xml_;_
SAPGuiWindowContext.SAPGuiOKCode("OKCode").Set Parameter.Item("sapgui_tcode")	'Enter the TCode with /n in front of it to ensure it's a new TCode window, not any existing open TCodes @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf1.xml_;_
SAPGuiWindowContext.SendKey ENTER																'Hit the Enter key to execute the TCode
