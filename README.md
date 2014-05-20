<h1>Mixpanel Event jQuery Plugin</h1>
This plugin simplifies implementation of Mixpanel events using jQuery selectors by extending mixpanel.track(), it is especially useful when working with forms. In most cases, it binds an onclick event to the selected element(s) that notifies mixpanel that the click took place and at what time. However, with checkboxes, radio buttons and select elements additional properties are tracked. There is also an option to track page views. All of this is detailed below: 

<strong>Basic Implementation:</strong>
````
$('#myImage').mixpanelEvent();
````
This will trigger mixpanel.track() on every click of '#myImage'. It will send an event with the name 'myImage' (by default, the name is the element's ID or, if it doesn't have one, the first parent ID found up the DOM tree) and the property 'Time Sent' – a date object widdled to fit Mixpanel's perferred format.
````
<strong>Setting the Event Name:</strong>
$('#myImage').mixpanelEvent({
  eventName: 'Someone clicked my image!'
});
````
This will pass the same type of event as above, except the name will be 'Someone clicked my image!' as opposed to the element's ID
````
<strong>Select Elements:</strong>
$('select[name="myDropDown"]').mixpanelEvent();
````
With select elements, the plugin sends an event to mixpanel onblur, it contains the following properties: 
 - 'Date Sent'
 - 'Changed To': The name of the selected option (or 'No Change')
<strong>Checkboxes:</strong>
````
$('input[name="myCheckboxes"]').mixpanelEvent();
````
With checkboxes, the following properties are sent to mixpanel:
 - 'Date Sent'
 - 'Action' - Eg. If the checkbox value is 'Blue', the string 'Blue was checked' or 'Blue was unchecked' will be sent
<strong>Radio Buttons:</strong> 
````
$('input[name="myRadios"]').mixpanelEvent();
````
With radio buttons, the following properties are sent to mixpanel:
 - 'Date Sent'
 - 'Changed From'
 - 'Changed To'
<strong>Tracking a page view:</strong> 
````
$('body').mixpanelEvent();
````
Passing 'body' as the jQuery selector will trigger an event on page load named 'PageViewSnapshot' with the property 'Time Sent'. It is also possible to pass various elements' onload values with this event. Eg.:
````
$('body').mixpanelEvent({
  checkVal: ['.myRadioButton', '.myCheckbox']
});
````
The above will send a 'PageViewSnapshot' event to mixpanel with an additional property that lists the values of the specified elements.

<br />
&mdash; Luke Whyte (http://lukeallanwhyte.com), 2014