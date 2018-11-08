from flask import Flask, Response
from flask_restful import Resource, Api
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
import os


class Camera(object):
	def __init__(self):
		self.cam = cv2.VideoCapture(0)
		self.cam.set(3, 640)
		self.cam.set(4, 480)
		self.face_detector = cv2.CascadeClassifier('../data/haarcascade_frontalface_default.xml')
		# For each person, enter one numeric face id
		self.face_id = input('\n enter user id end press <return> ==> ')
		print("\n [INFO] Initializing face capture. Look the camera and wait ...")
		# Initialize individual sampling face count
		self.count = 0

		# Path for face image database
		self.path = '../imageset/'
		self.recognizer = cv2.face.LBPHFaceRecognizer_create()
		self.detector = cv2.CascadeClassifier("../data/haarcascade_frontalface_default.xml")
	
	def get_frame(self):
		ret, frame = self.cam.read()
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces = self.face_detector.detectMultiScale(gray, 1.3, 5)
		print("\nfaces : " + str(faces))
		if faces != '()':
			for (x, y, w, h) in faces:
				cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
				self.count += 1
				if self.count > 30:
					print("\n capture finished")
					return -1
				# Save the captured image into the datasets folder
			cv2.imwrite("../imageset/User." + str(self.face_id) + "." + str(self.count) + ".jpg", gray[y:y+h,x:x+w])
			#cv2.imshow('image',img)
			return open("../imageset/User." + str(self.face_id) + "." + str(self.count) + ".jpg", 'rb').read()

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

app = Flask(__name__)


def gen(camera):
	while True:
		frame = camera.get_frame()
		k = cv2.waitKey(100) & 0xff
		if k == 27:
			break
		elif frame == -1:
			break
		yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
	print('\ntraining...')
	print("\n [INFO] Training faces. It will take a few seconds. Wait ...")
	faces, ids = camera.getImageAndLabels()
	camera.recognizer.train(faces, np.array(ids))
	# Save the model into trainer/trainer.yml
	camera.recognizer.write('../trainer/trainer.yml')  # recognizer.save() doesn't work
	# Print the number of faces trained and end program
	print("\n [INFO] {0} faces trained. trained file saved at trainer/trainer.yml. Exiting Program".format(
		len(np.unique(ids))))

@app.route('/')
def video_feed():
	return Response(gen(Camera()), 
		mimetype='multipart/x-mixed-replace;boundary=frame')

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)		



