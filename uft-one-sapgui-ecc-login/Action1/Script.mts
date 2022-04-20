'SAPGuiSession("Session").SAPGuiWindow("SAP").Resize 89,19
'SAPGuiSession("Session").SAPGuiWindow("SAP").SAPGuiEdit("Client").Set Parameter("Client")
'SAPGuiSession("Session").SAPGuiWindow("SAP").SAPGuiEdit("User").Set Parameter("User")
'SAPGuiSession("Session").SAPGuiWindow("SAP").SAPGuiEdit("Password").Set Parameter("Password")
'SAPGuiSession("Session").SAPGuiWindow("SAP").SAPGuiEdit("Language").Set Parameter("Language")
'SAPGuiSession("Session").SAPGuiWindow("SAP").SAPGuiEdit("Client").SetFocus
'SAPGuiSession("Session").SAPGuiWindow("SAP").SendKey ENTER

SAPGuiUtil.AutoLogon Parameter("SystemName"), Parameter("Client"), Parameter("User"), Parameter("Password"), Parameter("Language")
