import os, sys, shutil

from starlette.applications import Starlette
from starlette.responses import HTMLResponse, JSONResponse
from starlette.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from fastai.basic_train import *
from fastai.vision import *

from spectrogram import generate_spectrogram

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=['X-Requested-With', 'Content-Type'])
app.mount('/static', StaticFiles(directory='static'))

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
data_bunch = ImageDataBunch.single_from_classes(path, [0, 1],
                                            tfms=get_transforms(do_flip=False, max_rotate=0., max_lighting=0., max_warp=0.),
                                            size=224).normalize(imagenet_stats)
learn = create_cnn(data_bunch, models.resnet34)
learn.load('stage-2')

@app.route('/')
def index(request):
    html = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'view', 'index.html')
    return HTMLResponse(open(html, 'r', encoding='utf-8').read())

@app.route('/analyze', methods=['POST'])
async def analyze(request):
    data = await request.form()
    audio = await (data['file'].read())
    uploadpath = os.path.join(path, 'uploads')
    try:
        os.makedirs(uploadpath)
        filepath = os.path.join(uploadpath, 'test.wav')
        f = open(filepath, 'wb')
        f.write(audio)
        f.close()
        img_filepath = generate_spectrogram(filepath)
        pred_class, _, _ = learn.predict(open_image(img_filepath))
    finally:
        shutil.rmtree(uploadpath)

    return JSONResponse({'crying': pred_class})

if __name__ == '__main__':
    if 'run' in sys.argv:
        uvicorn.run(app, host='0.0.0.0', port=5042)