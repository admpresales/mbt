AIUtil.SetContext Browser("creationtime:=0")

'===========================================================================================
'BP:  Logout
'===========================================================================================

AIUtil("profile", micAnyText, micFromTop, 1).Click
AIUtil("exit").Click
'DJ20240909 Looks like the developers removed the Language combobox, so if it doesn't exist, anchor off of the licensing text
If AIUtil("combobox", "Language").Exist(0) Then
	AIUtil("button", micAnyText, micWithAnchorOnRight, AIUtil("combobox", "Language")).CheckExists True
Else
	AIUtil("button", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("Acknowledgments, Licensing and Certification")).CheckExists True
End If
'If you use ABBYY the below statement works.  The default OCR can't see the white text on the blue background
'AIUtil("text_box", "Username").CheckExists True
