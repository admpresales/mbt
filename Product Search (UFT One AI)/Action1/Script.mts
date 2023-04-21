Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("search").Search Parameter.Item("SearchText")										'Search for the product passed in from the parameter
AppContext.Sync																			'Wait for the browser to stop spinning
AIUtil("close").Click																			'Close the search diaglog
AppContext.Sync																			'Wait for the browser to stop spinning
WasEnabled = AIUtil.RunSettings.AutoScroll.IsEnabled
OrigDirection = AIUtil.RunSettings.AutoScroll.GetDirection
OrigMax = AIUtil.RunSettings.AutoScroll.GetMaxNumberOfScrolls
AIUtil.RunSettings.AutoScroll.Disable
rc = AIUtil("close").Exist (1)
AIUtil.FindTextBlock(micAnyText, micWithAnchorOnRight, AIUtil("search")).Click
If WasEnabled Then
    AIUtil.RunSettings.AutoScroll.Enable OrigDirection, OrigMax
End  If
AppContext.Sync																			'Wait for the browser to stop spinning

