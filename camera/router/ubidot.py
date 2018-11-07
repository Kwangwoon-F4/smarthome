from ubidots import ApiClient
import pymongo


def send_face(name):
    userName = name
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

    # datas dictionary
    ubi_datas = {
        'userId': userId,
        'userName': userName,
        'userHumidity': userHumidity,
        'userLight': userLight,
        'userLightColor': userLightColor,
        'userTemperature': userTemperature,
        'userSleepTime': userSleepTime,
    }
    send_data(ubi_datas)


def send_data(datas):
	# mongodb connection
	client = pymongo.MongoClient()
	db = client.userdata
	collection = db.userdata
	user_data = collection.find_one({"user_name": datas['userName']})
	print("humidity : " + str(user_data['user_humidity']))

	change_value = datas['userHumidity'].save_value({
		'value': user_data['user_humidity'],
		'context': {
			'description': datas['userName'] + '\'s humidity is ' + str(user_data['user_humidity'])
		}
	})
	change_value = datas['userLight'].save_value({
		'value': user_data['user_light'],
		'context': {
			'description': datas['userName'] + '\'s light is ' + str(user_data['user_light'])
		}
	})
	change_value = datas['userLightColor'].save_value({
		'value': user_data['user_lightcolor'],
		'context': {
			'description': datas['userName'] + '\'s light color is ' + str(user_data['user_lightcolor'])
		}
	})
	change_value = datas['userTemperature'].save_value({
		'value': user_data['user_temperature'],
		'context': {
			'description': datas['userName'] + '\'s temperature is ' + str(user_data['user_temperature'])
		}
	})
	change_value = datas['userSleepTime'].save_value({
		'value': user_data['user_sleeptime'],
		'context': {
			'description': datas['userName'] + '\'s sleep time is ' + str(user_data['user_sleeptime'])
		}
	})
	change_value = datas['userId'].save_value({
		'value': user_data['user_id'],
		'context': {
		'description': datas['userName'] + '\'s id is ' + str(user_data['user_id'])
		}
	})
