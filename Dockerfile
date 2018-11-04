FROM python:3.6-slim-stretch

RUN apt update
RUN apt install -y python3-dev gcc

ADD requirements.txt requirements.txt

RUN pip install -r requirements.txt

ADD server.py server.py
ADD spectrogram.py spectrogram.py
ADD view/index.html view/index.html
ADD static/style.css static/style.css
ADD static/client.js static/client.js
ADD data/models/stage-2.pth data/models/stage-2.pth

RUN python server.py

EXPOSE 5042

CMD ["python", "server.py", "run"]