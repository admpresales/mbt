Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("search").Search Parameter.Item("ProductID")
AIUtil.FindText(Parameter.Item("ProductID"), micFromBottom, 1).Click
AIUtil("text_box", "Quantity").SetText Parameter.Item("Quantity")
AIUtil("button", "ADD TO CART").Click
AIUtil.FindTextBlock(micAnyText, micWithAnchorOnRight, AIUtil("search")).Click
