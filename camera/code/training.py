import cv2
import numpy as np
from PIL import Image
import os
from flask_cors import CORS
from flask_restful import Resource, Api


class Training(Resource):
    recognizer = cv2.face.LBPHFaceRecognizer_create()

    def __init__(self):
        # Path for face image database
        self.path = 'imageset/'
        self.recognizer = cv2.face.LBPHFaceRecognizer_create()
        self.detector = cv2.CascadeClassifier("data/haarcascade_frontalface_default.xml")

    # function to get the images and label data
    def getImageAndLabels(self):
        imagePaths = [os.path.join(self.path, f) for f in os.listdir(self.path)]
        faceSamples = []
        ids = []
        for imagePath in imagePaths:
            PIL_img = Image.open(imagePath).convert('L')
            # convert it to grayscale
            img_numpy = np.array(PIL_img, 'uint8')
            id = int(os.path.split(imagePath)[-1].split(".")[1])
            faces = self.detector.detectMultiScale(img_numpy)
            for (x, y, w, h) in faces:
                faceSamples.append(img_numpy[y:y + h, x:x + w])
                ids.append(id)
        return faceSamples, ids

    print("\n [INFO] Training faces. It will take a few seconds. Wait ...")
    faces, ids = getImageAndLabels()
    recognizer.train(faces, np.array(ids))
    # Save the model into trainer/trainer.yml
    recognizer.write('trainer/trainer.yml')  # recognizer.save() doesn't work
    # Print the number of faces trained and end program
    print("\n [INFO] {0} faces trained. trained file saved at trainer/trainer.yml. Exiting Program".format(
        len(np.unique(ids))))
