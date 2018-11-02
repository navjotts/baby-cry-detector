FROM python:3.6.7

RUN apt update
RUN apt install -y python3-dev gcc

RUN pip install starlette uvicorn python-multipart aiofiles
RUN pip install torch_nightly -f https://download.pytorch.org/whl/nightly/cpu/torch_nightly.html
RUN pip install --no-dependencies fastai
RUN pip install librosa matplotlib

COPY . .

EXPOSE 5042

CMD ['python', 'server.py']