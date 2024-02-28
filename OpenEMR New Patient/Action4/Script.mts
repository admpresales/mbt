AIUtil.SetContext Browser("creationtime:=0")

'===========================================================================================
'BP:  Logout
'===========================================================================================

AIUtil("profile", micAnyText, micFromTop, 1).Click
AIUtil("exit").Click
AIUtil("button", micAnyText, micWithAnchorOnRight, AIUtil("combobox", "Language")).CheckExists True
'If you use ABBYY the below statement works.  The default OCR can't see the white text on the blue background
'AIUtil("text_box", "Username").CheckExists True
