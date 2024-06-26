AIUtil.SetContext Browser("creationtime:=0")
AIUtil.FindTextBlock("Exit").Click
Browser("creationtime:=0").Sync																			'Wait for the browser to stop spinning
Set ResultsMessage = AIRegex("Results (\d+)")
AIUtil.FindTextBlock(ResultsMessage).CheckExists True
AIUtil("left_triangle").Click
Browser("creationtime:=0").Sync																			'Wait for the browser to stop spinning

