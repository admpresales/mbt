Dim counter

Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("search").Click
AIUtil("text_box", "Search").SetText "vl01n"
AIUtil("search").Click
AppContext.Sync																			'Wait for the browser to stop spinning

counter = 0
Do
	counter = counter + 1
	wait 1
	If counter >= 60 Then
		msgbox "The search returning the text Apps didn't display within " & counter & " attempts.  Check the application."
		ExitTest
	End If
Loop Until AIUtil.FindTextBlock("Apps").Exist
counter = 0
Do
	counter = counter + 1
	AIUtil.FindTextBlock("With Order Reference").Click
	If counter >= 60 Then
		msgbox "The With Order Reference text block isn't disappearing like it should, check application"
		ExitTest
	End If
Loop Until AIUtil.FindTextBlock("Create Outbound Delivery with Order Reference").Exist(10)

AIUtil.FindTextBlock("Create Outbound Delivery with Order Reference").CheckExists True

