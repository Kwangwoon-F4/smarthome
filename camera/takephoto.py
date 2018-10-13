import cv2

cap = cv2.VideoCapture(0)
filename = "image.jpg"

ret,frame = cap.read()
cv2.imwrite(filename,frame)
cap.release()

