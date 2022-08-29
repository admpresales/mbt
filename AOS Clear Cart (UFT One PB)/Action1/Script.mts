Browser("Advantage Shopping").Page("Advantage Shopping").WebElement("Shopping Cart Icon").Click
Browser("Advantage Shopping").Page("Advantage Shopping").Sync
While Browser("Advantage Shopping").Page("Advantage Shopping").WebElement("First Cart Remove Button").Exist(0)
	Browser("Advantage Shopping").Page("Advantage Shopping").WebElement("First Cart Remove Button").Click
	Browser("Advantage Shopping").Page("Advantage Shopping").Sync
Wend
Browser("Advantage Shopping").Page("Advantage Shopping").WebElement("Home Icon").Click
Browser("Advantage Shopping").Page("Advantage Shopping").Sync

