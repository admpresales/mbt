SAPGuiSession("Session").SAPGuiWindow("SAP Easy Access  -  User").Maximize @@ hightlight id_;_0_;_script infofile_;_ZIP::ssf1.xml_;_
SAPGuiSession("Session").SAPGuiWindow("SAP Easy Access  -  User").SAPGuiButton("Exit").Click @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf1.xml_;_
SAPGuiSession("Session").SAPGuiWindow("Log Off").SAPGuiButton("Yes").Click @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf2.xml_;_
SystemUtil.CloseProcessByName "saplogon.exe"
