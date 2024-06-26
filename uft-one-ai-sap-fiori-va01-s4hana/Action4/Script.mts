Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("text_box", "Order Type:").SetText "OR"
AIUtil.Context.Freeze
set objSendKey=CreateObject("WScript.shell")
objSendKey.SendKeys "{TAB}{BACKSPACE}"
AIUtil("text_box", "Division").SetText "00"
AIUtil("text_box", "Distribution Channel:").SetText "10"
AIUtil("text_box", "Sales Organization:").SetText "1710"
AIUtil("button", "Continue").Click
AIUtil.Context.UnFreeze
