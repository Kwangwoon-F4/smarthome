from flask import Flask, Response
import cv2
import os

class Camera(object):
	def __init__(self):
		self.cam = cv2.VideoCapture(0)
		self.cam.set(3, 640)
		self.cam.set(4, 480)
		self.face_detector = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')
		# For each person, enter one numeric face id
		self.face_id = input('\n enter user id end press <return> ==> ')
		print("\n [INFO] Initializing face capture. Look the camera and wait ...")
		# Initialize individual sampling face count
		self.count = 0
	
	def get_frame(self):
		ret, frame = self.cam.read()
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces = self.face_detector.detectMultiScale(gray, 1.3, 5)
		print("\nfaces : " + str(faces))
		if faces != '()':
			for (x,y,w,h) in faces:
				cv2.rectangle(frame, (x,y), (x+w,y+h), (255,0,0), 2)
				self.count += 1
				if self.count > 30:
					print("\n capture finished")
					return -1
				# Save the captured image into the datasets folder
			cv2.imwrite("imageset/User." + str(self.face_id) + "." + str(self.count) + ".jpg", gray[y:y+h,x:x+w])
			#cv2.imshow('image',img)
			return open("imageset/User." + str(self.face_id) + "." + str(self.count) + ".jpg", 'rb').read()

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

@app.route('/')
def video_feed():
	return Response(gen(Camera()), 
		mimetype='multipart/x-mixed-replace;boundary=frame')

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)		



