AIUtil.SetContext Browser("CreationTime:=0")

'===========================================================================================
'BP:  Login
'===========================================================================================

AIUtil.Context.Freeze
AIUtil("text_box", "Username").SetText Parameter.Item("Username")
AIUtil("text_box", "Password").SetText Parameter.Item("Password")
AIUtil("button", "Login").Click
AIUtil.Context.UnFreeze

AIUtil("profile").CheckExists True
