FROM python:3.6-slim-stretch

RUN apt update
RUN apt install -y python3-dev gcc

RUN pip install torch_nightly -f https://download.pytorch.org/whl/nightly/cpu/torch_nightly.html
RUN pip install fastai
RUN pip install starlette uvicorn python-multipart aiofiles librosa

ADD server.py server.py
ADD spectrogram.py spectrogram.py
ADD view/index.html view/index.html
ADD static/client.js static/client.js
ADD static/style.css static/style.css
ADD data/models/stage-2.pth data/models/stage-2.pth

RUN python server.py

EXPOSE 5042

CMD ["python", "server.py", "run"]