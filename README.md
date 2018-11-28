# Baby Cry Detector
Uses DL techniques to detect whether a baby is crying (to notify young parents)

### Local Setup
```
$ pip install -r requirements.txt
```
* Register a https://www.twilio.com/ account
* get the details needed in `conf.json.template`
* create a new file called `conf.json` with the appropriate values

### Local Demo
```
$ python server.py run
```

### Deployed Demo
* URL: [https://baby-cry-detector.now.sh/](https://baby-cry-detector.now.sh/)
* branch: [release_docker](https://github.com/navjotts/baby-cry-detector/tree/release_docker) (only has files needed for Inference)

---
### Training
1. Data Collection
    * We used [https://freesound.org/](https://freesound.org/) to collect audio files, augmented with [https://urbansounddataset.weebly.com/urbansound8k.html](https://urbansounddataset.weebly.com/urbansound8k.html)
    * Idea above was used to generate a dataset of different sounds which can occur around the place where a infant/baby is sleeping
    * We tried to make a robust dataset, like
        * having different animal cries which could be similar to a human baby cry
        * having silence as some of the training samples
    * No effort was put into trying to differentiate between a baby laugh v/s a baby cry – as the need was to detect whether a sleeping infant is up (babies normally cry once up), and even a laughing (or any sound) baby should trigger the alarm for parents (if needed, this could be attempted, and would be the real test for the model)
2. Data Preprocessing
    * The audio files are split into smaller chunks of audio to capture different patterns that can occur
    * The audio is then converted into spectrograms - on which we then tried different Image Classification models
3. Results
    * CNN with Transfer Learning from a pre-trained resnet34 seems to be performing extremely good (with a CV split of 0.2)

---
### TODOs
1. Add continuous audio support - where the user presses the START button and leaves the app (on a device) - and the app can detect whenever the baby starts crying (we can just run the current process every `'x'` seconds on repeat until stopped by the user)
2. Integrate with Twilio API for an option to send a message to the user when a baby cry is detected
3. Similar/Alternate to above, have a simple mobile app which could send out a notification when a baby cry is detected
4. Improve the dataset with more different kinds of audio sounds that can confuse the model