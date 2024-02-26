AIUtil.SetContext Browser("CreationTime:=0")

'===========================================================================================
'BP:  Navigate to the New/Search Patient screen
'===========================================================================================

AIUtil.FindText("Patient").Hover

AIUtil.FindTextBlock("New/Search").Click

'===========================================================================================
'BP:  Enter in the new patient information
'===========================================================================================

'AIUtil.Context.Freeze
AIUtil("text_box", "Name:", micWithAnchorOnLeft, AIUtil.FindTextBlock("First Name")).SetText Parameter.Item("NewPatientFirstName")
AIUtil("text_box", "Middle").SetText Parameter.Item("NewPatientMiddleName")
AIUtil("text_box", "Last Name").SetText Parameter.Item("NewPatientLastName")

AIUtil("combobox", "Sex:").Select Parameter.Item("NewPatientSex")
AIUtil("text_box", micAnyText, micWithAnchorOnLeft, AIUtil.FindTextBlock("DOB:")).SetText Parameter.Item("NewPaitientDOB")

