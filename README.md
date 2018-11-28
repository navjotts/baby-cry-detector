# Baby Cry Detector
Uses DL techniques to detect whether a baby is crying (to notify young parents)

### Setup
```
$ pip install -r requirements.txt
```
* Register a https://www.twilio.com/ account
* get the details needed in `conf.json.template`
* create a new file called `conf.json` with the appropriate values
* **deploying:** remove `conf.json` from `.gitignore`

### Demo
```
$ python server.py run
```