Set AppContext=Browser("CreationTime:=0")												'Set the variable for what application (in this case the browser) we are acting upon

AIUtil.SetContext AppContext																'Tell the AI engine to point at the application

AIUtil("shopping_cart").Click																'Click the shopping cart icon to get to the cart
AIUtil("button", micAnyText, micFromBottom, 1).Click										'Click the bottom button on the screen which is the checkout button, has dynamic text on it
AIUtil("button", "NEXT").Click																'Click the NEXT button to proceed
AIUtil("button", "PAY NOW").Click															'Click the PAY NOW button
AIUtil.FindTextBlock(micAnyText, micWithAnchorOnRight, AIUtil("search")).Click				'Click the company logo text
