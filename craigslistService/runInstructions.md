[ brew update ] - Update all installed homebrew formula

[ which xcode-select ] - Check if you've installed xcode-select or not. If it is installed, terminal will print something like [ /usr/bin/xcode-select ]. Otherwise, nothing will return and you have to run [ xcode-select --install ]. Wait for it to finish installing before proceed to the next step.

[ brew install python3 ] - Install the latest version of python 3. Python has two versions (2 and 3) concurrently. Version 2.7 is installed on the Mac by default. Version 3 is the latest and everyone is shifting away from version 2.

[  pip3 install Scrapy ] - Install Scrapy into your machine.

To run the "spider", use the following syntax

[ scrapy crawl <spider name> -o <file to be save name>.json ]

So, for querying San Francisco, you could

[ scrapy crawl cityoncraigslist -o sanfrancisco.json ]
