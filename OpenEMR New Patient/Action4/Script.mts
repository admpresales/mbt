AIUtil.SetContext Browser("creationtime:=0")

'===========================================================================================
'BP:  Logout
'===========================================================================================

AIUtil("profile", micAnyText, micFromTop, 1).Click
AIUtil("exit").Click
AIUtil("text_box", "Username").CheckExists True
