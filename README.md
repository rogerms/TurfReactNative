# Turf
That one app that you play sports with all the time

### Want some help getting set up?

#### Dependencies
You must have the following installed:
- `Node.js` This is a javascript "runtime" so you can make scripts/servers/apps in an easy language
- `create-react-native-app` You install this in node on the command line. It downloads the emulator connectors, and basic file structure so you can create an app
- `xCode CommandLine Tools` This is so you can emulate an iPhone using your app if you have a mac.
- `a good code editor` like brackets/webstorm/eclipse. I have the student version of webstorm
- `git` the versioning system so you can keep track of changes or roll back.


#### download this repo
Open the terminal and navigate to the folder you want to install it in ex.
```
cd ~/Documents
```
Copy everything from this repo:
```
git clone git@github.com:TurfSportsTeam/TurfReactNative.git
```

#### Start the simulator
Install any dependencies (from the command line, and having already navigated to inside your project folder)
```
npm install
```
- iOS: 
```
react-native run-ios      //optionally add: --simulator="iPhone 4s"
```
- Android:
  
  Go to the android/ directory
  
  Create a file called local.properties with this line:
  
  sdk.dir = /Users/USERNAME/Library/Android/sdk
  
  Where USERNAME is your OSX username

```
react-native run-android    //I can't get it to work yet
```
show a list of devices you can run on (swap out iPhone 4s in the above command)
```
xcrun simctl list devices
```

#### Dev Notes:
please make any major changes exist in a new branch and try to keep the main branch mostly error free.

There's a list of items to work on in the Trello board. Pick a color no one else has, and label it with your name. When you work on an item, mark that item with your color.

There's also plenty of documentation about the app in the Google Drive folder

