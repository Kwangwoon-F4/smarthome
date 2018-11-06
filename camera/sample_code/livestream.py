from flask import Flask, Response
import numpy as np
import cv2
from time import sleep

class Camera(object):
	def __init__(self):
		#self.cap = cv2.VideoCapture("http://localhost:8090/out.h264")
		self.faceCascade = cv2.CascadeClassifier('../data/haarcascade_frontalface_default.xml')
		self.cap = cv2.VideoCapture(0)
		self.cap.set(3, 640)
		self.cap.set(4, 480)

	def get_frame(self):
		ret, frame = self.cap.read()
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces = self.faceCascade.detectMultiScale(
			gray,
			scaleFactor=1.2,
			minNeighbors=5,
			minSize=(20, 20)
		)
		for (x,y,w,h) in faces:
			cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
			roi_gray = gray[y:y+h, x:x+w]
			roi_color = frame[y:y+h, x:x+w]
	
		#imgencode=cv2.imencode('.jpg',frame)[1]
		#stringData=imgencode.tostring()
		#return stringData

		cv2.imwrite('stream.jpg',frame)
		#cv2.imshow('VIDEO',frame)
		#sleep(0.1)
		#return open(frame)
		return open('stream.jpg', 'rb').read()

app = Flask(__name__)

def gen(camera):
	while True:
		frame = camera.get_frame()
		#yield(b' --frame\r\n' b'Content-Type: text/plain\r\n\r\n' + frame+b'\r\n')
		yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def video_feed():
	return Response(gen(Camera()),
		mimetype='multipart/x-mixed-replace;boundary=frame')

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)
