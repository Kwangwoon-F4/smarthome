from ubidots import ApiClient


def send_face(name):
	user_name = name
	api = ApiClient(token="BBFF-GfqBNxadAnLhwdTjCV0frdTPKwnnK6")
	# user humidity
	userHumidity = api.get_variable('5bceedb71d847256f30adc5f')
	humidity = userHumidity.get_values(1)
	userLightColor = api.get_variable('5bceede61d847256f30adc8f')
	lightColor = userLightColor.get_values(1)
	userTemperature = api.get_variable('5bceedab1d847256d1909349')
	temperature = userTemperature.get_values(1)
	userSleepTime = api.get_variable('5bd05e171d84725b56333ffe')
	sleepTime = userSleepTime.get_values(1)
	userId = api.get_variable('5bd05ecf1d84725bca494a79')
	id = userId.get_values(1)

	# temp value
#	user_face = api.get_variable('5bc2aba51d847271c8bac044')

	if (user_name == 'wonjae') or (user_name == 'youngil'):
#		change_value = user_face.save_value({
#			'value': 00,
#			'context': {
#				'user_name': user_name,
#				'user_temperature': 24,
#				'user_humidity': 'high',
#				'user_light': 'high',
#				'user_sleeptime': 2100,
#				'user_lightcolor': '(110,110,110)'
#			},
#			'description': 'The face of recognized person is ' + user_name
#		})
		change_value = userHumidity.save_value({
			'value': 3,
			'context': {
				'description' : 'value 3 is high'
			}
		})
		print("\nhumidity : " +  userHumidity.get_values(1)[0])

def send_data(variable):
	if variable == 'userHumidity':
		variable.save_value({
			'value': 3,
			'context': {
				'description' : 'wonjae\'s humidity is high'
			}
		})
	elif variable == 'userLight':
