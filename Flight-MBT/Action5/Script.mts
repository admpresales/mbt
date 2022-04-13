' Delete the reservation based on the single non-empty parameter that is passed in
' Only one passed-in parameter should be non-empty
' For example, if  PassengerName = John then this action will search for that passenger
' and delete the first returned row with PassengerName = John
' This action must start on the screen that shows the ORDER DETAILS.
'Typically that means you must run a SEARCH ORDER action first.

a=Parameter("OrderNumber")
b=Parameter("PassengerName")
c=Parameter("OrderDate")

RunAction "500-SearchOrder", oneIteration, Parameter("OrderNumber"), Parameter("PassengerName"), Parameter("OrderDate")
RunAction "600-TrashcanOrder", oneIteration

 'Flight GUI app ends on the Deletion confirmation screen showing BOOK FLIGHT and SEARCH ORDER.
