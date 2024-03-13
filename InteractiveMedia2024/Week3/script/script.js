var data = [
  {
    welcomeType:
      "<span>Media queries allow you to apply CSS styles depending on a device's media type (such as print vs. screen) or other features or characteristics such as screen resolution or orientation, aspect ratio, browser viewport width or height (mobile vs. desktop), user preferences such as preferring reduced motion, data usage, or transparency. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries</span><br/>",
  },
];

var allElements = document.getElementsByClassName("welcome-txt");
for (var j = 0; j < allElements.length; j++) {
  var currentElementId = allElements[j].id;
  var currentElementIdContent = data[0][currentElementId];
  var element = document.getElementById(currentElementId);
  var devTypeText = currentElementIdContent;

  // type code
  var i = 0,
    isTag,
    text;
  (function type() {
    text = devTypeText.slice(0, ++i);
    if (text === devTypeText) return;
    element.innerHTML = text + `<span class='blinker'>&#32;</span>`;
    var char = text.slice(-1);
    if (char === "<") isTag = true;
    if (char === ">") isTag = false;
    if (isTag) return type();
    setTimeout(type, 50);
  })();
}
