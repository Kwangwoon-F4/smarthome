from flask import Flask, Response
import cv2
import numpy as np
import os
from router import ubidot

class Camera(object):
	def __init__(self):
		self.recognizer = cv2.face.LBPHFaceRecognizer_create()
		self.recognizer.read('trainer/trainer.yml')
		self.faceCascade = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')
		self.font = cv2.FONT_HERSHEY_SIMPLEX

		# iniciate id counter
		self.last_id = "no-face"

		# names related to ids: example ==> 012 : id=1, etc
		self.names = ['youngil','junyeong','narae','dongho','wonjae','seeung']

		# Camera initialize
		self.cam = cv2.VideoCapture(0)
		self.cam.set(3, 640) # set video width
		self.cam.set(4, 480) # set video height

		# Define min window size to be recognized as a face
		self.minW = 0.1*self.cam.get(3)
		self.minH = 0.1*self.cam.get(4)

	def get_frame(self):
		ret, frame = self.cam.read()
		print("\n after self.cam.read()")
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces = self.faceCascade.detectMultiScale( 
				gray,
				scaleFactor = 1.2,
				minNeighbors = 5,
				minSize = (20,20),
				)
#		print("\n after detectMultiScale")

		id = "no-face"
		for(x,y,w,h) in faces:
#print("\n before making rectangle")
			cv2.rectangle(frame, (x,y), (x+w,y+h), (0,255,0), 2)
#print("\n before self.recognizer.predict")
			id, confidence = self.recognizer.predict(gray[y:y+h,x:x+w])
#print("\n after self.recognizer.predict")

			# Check if confidence is less them 100 ==> "0" is perfect match
			if (confidence < 100):
				id = self.names[id]
				confidence = "  {0}%".format(round(100 - confidence))
			else:
				id = "unknown"
				confidence = "  {0}%".format(round(100 - confidence))
#print("\n after confidence check, id : " + str(id))
			
			cv2.putText(frame, str(id), (x+5,y-5), self.font, 1, (255,255,255), 2)
			cv2.putText(frame, str(confidence), (x+5,y+h-5), self.font, 1, (255,255,0), 1)
		
		
		cv2.imwrite('stream.jpg', frame)

		if (self.last_id == id) or (id == "unknown" or id == "no-face"):
			print("nothing changed")
		else:
			print("\nid : " + id + ", last_id : " + self.last_id)
			self.last_id = id
#			ubidot.send_face(id)				# ubidot send_face call !!
			
#			cv2.imshow('camera', frame)
#			k = cv2.waitKey(10) & 0xff
#			if k == 27:
#				print("\n [INFO] Exiting program and cleaning stuff")
#				self.cam.release()
#				cv2.destroyAllWindows()
#				return -1
#			else:
		return open('stream.jpg', 'rb').read()

app = Flask(__name__)

def gen(camera):
	while True:
		frame = camera.get_frame()
		if frame == -1:
			break
		print("\n open stream.jpg complete!")
		yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
		print("\n yield complete!!")
@app.route('/')
def video_feed():
	return Response(gen(Camera()),
			mimetype='multipart/x-mixed-replace;boundary=frame')

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)
