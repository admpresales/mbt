Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon
AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("text_box", "Cust. Reference:").SetText "450000019998"
'AIUtil.Context.Freeze 
AIUtil("text_box", "Cust. Ref. Date:").SetText FormatDateTime((Date-1), 2)
AIUtil("text_box", "Ship-To Party:").SetText "EWM17-CU02"
AIUtil("text_box", "Sold-To Party:").SetText "EWM17-CU02"
'AIUtil.Context.UnFreeze 
