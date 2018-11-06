import os
from pydub import AudioSegment

count = 0

def split_audio_file(filename, t=4):
    global count
    print("splitting", filename)
    try:
        audio = AudioSegment.from_wav("./input/%s" % filename)
        len_of_split = t*1000
        num_of_splits = int(len(audio)/len_of_split)
        for i in range(num_of_splits):
            split = audio[i*len_of_split:(i+1)*len_of_split]
            split.export("./output/%d_%d.wav" % (i, count), format="wav")
    except Exception as e:
        print("Error encountered while processing file: ", filename)

    count += 1

for filename in os.listdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'input')):
    split_audio_file(filename)