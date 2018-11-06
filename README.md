# Baby Cry Detector
Uses DL techniques to detect whether a baby is crying (to notify young parents)

### Local Setup
```
$ pip install -r requirements.txt
```

### Local Demo
```
$ python server.py run
```

### Deployed Demo
* URL: [https://baby-cry-detector.now.sh/](https://baby-cry-detector.now.sh/)
* branch: [release_docker](https://github.com/navjotts/baby-cry-detector/tree/release_docker) (only has files needed for Inference)

### Training
1. Data Collection
    * We used [https://freesound.org/](https://freesound.org/) to collect audio files, augmented with [https://urbansounddataset.weebly.com/urbansound8k.html](https://urbansounddataset.weebly.com/urbansound8k.html)
    * Idea above was used to generate a dataset of different sounds which can occur around the place where a infant/baby is sleeping
    * We tried to make a robust dataset, like
        * having different animal cries which could be similar to a human baby cry
        * having silence as some of the training samples
2. Data Preprocessing
    * The audio files are split into smaller chunks of audio to capture different patterns that can occur
    * The audio is then converted into spectrograms - on which we then tried different Image Classification models
3. Results
    * CNN with Transfer Learning from a resnet34 seems to be performing extremely good (with a CV split of 0.2)

