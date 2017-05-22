m5bp
========

HTML&ndash;first concept for a futuristic MODX Revolution based manager&nbsp;interface. [Take this concept for a spin](http://m5bp.herokuapp.com) by waking the Heroku&nbsp;dino.

## HTML&ndash;first
 - tested as raw HTML

## Emoji&ndash;first

 - weightless art
 - universal
 - 118n

## Responsive Layout
 - mobile first
 - sticky positioning

## Uber
 - Not just an uberbar, an uber interface

## Accessibility Preferences

 - font size
 - font fontface
 - contrast
 - layout complexity
 - enlarge tap targets
 
 ## Accessibility Testing
 What accessibiilty tests can be automated are done so on the Command Line via [axe-cli](https://github.com/dequelabs/axe-cli).
 
 ```bash
 npm install axe-cli -g
 npm install selenium-webdriver -g # probably need this too
 axe https://m5bp.herokuapp.com # or the URL to your local dev environment
 ```
 
 > Please note that only 20% to 50% of all accessibility issues can automatically be detected. 
Manual testing is always required. For more information see:
https://dequeuniversity.com/curriculum/courses/testing
