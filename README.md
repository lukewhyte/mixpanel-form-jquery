<h1>Mixpanel Event jQuery Plugin</h1>
This plugin simplifies Mixpanel implementation through jQuery selectors – extending mixpanel.track(). It is especially useful when working with forms. 

When the selected element(s) are clicked, an event is sent to Mixpanel featuring a time stamp). If the element(s) is/are checkboxes, radio buttons or select elements additional properties are tracked. There's also an option to track page views.

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
With select elements, the plugin sends an event to mixpanel onblur containing the following properties: 
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
 - 'Changed From'
 - 'Changed To'

<strong>Tracking a Page View:</strong> 
````
$('body').mixpanelEvent();
````
Passing 'body' as the jQuery selector will trigger an event on page load named 'PageViewSnapshot' with the property 'Time Sent'. It is also possible to pass various element values with this event. Eg.:
````
$('body').mixpanelEvent({
  checkVal: ['.myRadioButton', '.myCheckbox']
});
````
The above will send a 'PageViewSnapshot' event to mixpanel with an additional property that lists the values of the specified elements in 'checkVal'.

<strong>Extending the Plugin</strong>

You can easily extend the plugin to support unique tracking methods using the following implementation:
````
var customEvent = function(event) {
  var $target = $(event.target), // This isn't necessary, but useful with click events
      result = {
        eventType: this.setName(), // The event name needs the key 'eventType'
        properties: { // some badass code }
      };
  // Some more badass code
  this.mixpanel(result); // This method contains mixpanel.track()
};

$.extend(true, $.fn['mixpanelEvent'].prototype, customEvent); // This adds your method to the plugin

$('#myElement').mixpanelEvent({
  callback: function() { // When calling the new method, it needs to be wrapped in the 'callback' method
    var that = this;
    this.click(function(event) {
      that.customEvent(event);
    });
  }
});

<strong>Mixpanel Documentation</strong>

Here's some good links to Mixpanel implementation and documentation docs:
 - Developer Docs: https://mixpanel.com/help/reference
 - Mixpanel University: https://mixpanel.com/learn/get-started


&mdash; Luke Whyte (http://lukeallanwhyte.com), 2014