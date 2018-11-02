from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt
import librosa, librosa.display

def generate_spectrogram(filepath):
    data, sampling_rate = librosa.load(filepath)
    plt.figure(figsize=(1, 1))
    plt.axis('off')
    melspectrogram = librosa.feature.melspectrogram(y=data, sr=sampling_rate)
    librosa.display.specshow(librosa.power_to_db(melspectrogram, ref=np.max))
    img_filepath = Path(str(filepath).replace('.wav', '.png'))
    plt.savefig(img_filepath, dpi=224)
    plt.close()
    return img_filepath