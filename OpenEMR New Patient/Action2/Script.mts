AIUtil.SetContext Browser("CreationTime:=0")

'===========================================================================================
'BP:  Login
'===========================================================================================

AIUtil.RunSettings.OCR.UseConfigSet UFT_OCR
AIUtil.Context.Freeze
AIUtil("text_box", "Username").SetText Parameter.Item("Username")
AIUtil("text_box", "Password").SetText Parameter.Item("Password")
'The below statement is what you would have to use for AI OCR
'AIUtil("button", micAnyText, micWithAnchorOnRight, AIUtil("combobox", "Language")).Click
'If you use ABBYY the below statement works.  The default OCR can't see the white text on the blue background
AIUtil("button", "Login").Click
AIUtil.Context.UnFreeze
AIUtil.RunSettings.OCR.UseConfigSet AI_OCR

AIUtil("profile").CheckExists True
