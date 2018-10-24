from ubidots import ApiClient
import pymongo


def send_face(name):
	user_name = name
	api = ApiClient(token="BBFF-GfqBNxadAnLhwdTjCV0frdTPKwnnK6")
	# user values
	userHumidity = api.get_variable('5bceedb71d847256f30adc5f')
#	humidity = userHumidity.get_values(1)
	userLight = api.get_variable('5bceed1c1d84725599d4ba29')
#	light = userLight.get_values(1)
	userLightColor = api.get_variable('5bceede61d847256f30adc8f')
#	lightColor = userLightColor.get_values(1)
	userTemperature = api.get_variable('5bceedab1d847256d1909349')
#	temperature = userTemperature.get_values(1)
	userSleepTime = api.get_variable('5bd05e171d84725b56333ffe')
#	sleepTime = userSleepTime.get_values(1)
	userId = api.get_variable('5bd05ecf1d84725bca494a79')
#	id = userId.get_values(1)

	datas = {
		'userHumidity':userHumidity, 
		'userLight':userLight, 
		'userLightColor':userLightColor,
		'userTemperature':userTemperature,
		'userSleepTime':userSleepTime,
		'userId':userId}

	# mongodb connection
	client = pymongo.MongoClient()
	db = client.userdata
	collection = db.userdata
	userdata = collection.find_one({"user_name": user_name})
	send_data(datas)

def send_data(userdata):
	print("humidity : " + str(user["user_humidity"]))
	# if user == 'userHumidity':
	# 	user.save_value({
	# 		'value': 3,
	# 		'context': {
	# 			'description' : 'wonjae humidity is high'
	# 		}
	# 	})
	#elif user == 'userLight':
