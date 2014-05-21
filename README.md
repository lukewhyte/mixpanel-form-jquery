<h1>Simplified Mixpanel Form Tracking</h1>
This plugin simplifies Mixpanel implementation through jQuery selectors – extending mixpanel.track(). It is especially useful when working with forms. 

When the selected element(s) are clicked, an event is sent to Mixpanel featuring a time stamp. If the element(s) is/are checkboxes, radio buttons or select elements additional properties are tracked. There's also an option to track page views.

<strong>Basic Implementation:</strong>
````
$('#myImage').mixpanelEvent();
````
This will trigger mixpanel.track() on every click of '#myImage', passing an event with the name 'myImage' and the property 'Time Sent' – a date object widdled to fit Mixpanel's perferred format. By default, event names are the element's ID or, if it doesn't have one, the first parent ID found up the DOM tree... however:

<strong>Setting the Event Name:</strong>
````
$('#myImage').mixpanelEvent({
  eventName: 'Someone clicked my image!'
});
````
This will pass the same type of event as above, except the name will be 'Someone clicked my image!' as opposed to the element's ID

<strong>Select Elements:</strong>
````
$('select[name="myDropDown"]').mixpanelEvent();
````
With select elements, the plugin sends an event (fired onblur) to mixpanel containing the following properties: 
 - 'Date Sent'
 - 'Changed To': The name of the newly selected option (or 'No Change')

<strong>Checkboxes:</strong>
````
$('input[name="myCheckboxes"]').mixpanelEvent();
````
With checkboxes, the following properties are sent to mixpanel:
 - 'Date Sent'
 - 'Action' - Eg. If the checkbox value is 'Blue', the string 'Blue was checked' – or the string 'Blue was unchecked' – will be sent

<strong>Radio Buttons:</strong> 
````
$('input[name="myRadios"]').mixpanelEvent();
````
With radio buttons, the following properties are sent to mixpanel:
 - 'Date Sent'
 - 'Changed From' - Old checked input value
 - 'Changed To' - Newly checked input value

<strong>Tracking a Page View:</strong> 
````
$('body').mixpanelEvent();
````
Passing 'body' as the jQuery selector will trigger an event on page load named 'PageViewSnapshot' with the property 'Time Sent'. This event can also be passed a string containing a list of element values. Eg.:
````
$('body').mixpanelEvent({
  checkVal: ['.myRadioButton', '.myCheckbox']
});
````
The above will send a 'PageViewSnapshot' event to mixpanel with an additional property that lists the values of the specified elements in 'checkVal'.

<strong>Extending the Plugin</strong>

You can extend the plugin to support unique tracking methods using the following implementation:
````
var customEvent = function(that, $element) { 
  // 'that' = the 'this' keyword from the plugin instance
  // '$element' = the targeted selector wrapped in a jQuery object

  var result = { 
    // You'll need to pass an object to the mixpanel method containin the following two keys:
    eventName: 'My event name!',
    properties: { // some badass code }
  };

  // Some more badass code

  that.mixpanel(result); // This method contains mixpanel.track()
};

// Now we call the new method
$('#myElement').mixpanelEvent({
  // When calling the new method, it needs to be wrapped in the 'callback' method
  callback: function(that, element) { that.customEvent(that, element); }
});
````
<strong>Mixpanel Documentation</strong>

Here's some good links to Mixpanel docs:
 - Developer Docs: https://mixpanel.com/help/reference
 - Mixpanel University: https://mixpanel.com/learn/get-started


&mdash; Luke Whyte (http://lukeallanwhyte.com), 2014