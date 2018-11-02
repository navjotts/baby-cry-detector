# Baby Cry Detector
Uses DL techniques to detect whether a baby is crying (to notify young parents)

### Setup
```
$ pip install starlette uvicorn python-multipart aiofiles
$ pip install torch_nightly -f https://download.pytorch.org/whl/nightly/cpu/torch_nightly.html
$ pip install fastprogress scipy pandas typing pyyaml dataclasses Pillow matplotlib torchvision-nightly
$ pip install --no-dependencies fastai
$ pip install librosa
```

### Demo
```
$ python server.py run
```