from ubidots import ApiClient


def ubi_connect():
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
        'userHumidity': userHumidity,
        'userLight': userLight,
        'userLightColor': userLightColor,
        'userTemperature': userTemperature,
        'userSleepTime': userSleepTime,
    }
    return ubi_datas


def send_data(db_data, ubi_data):

    change_value = ubi_data['userHumidity'].save_value({
        'value': db_data['user_humidity'],
        'context': {
            'description': ubi_data['userName'] + '\'s humidity is ' + str(db_data['user_humidity'])
        }
    })
    change_value = ubi_data['userLight'].save_value({
        'value': db_data['user_light'],
        'context': {
            'description': ubi_data['userName'] + '\'s light is ' + str(db_data['user_light'])
        }
    })
    change_value = ubi_data['userLightColor'].save_value({
        'value': db_data['user_lightcolor'],
        'context': {
            'description': ubi_data['userName'] + '\'s light color is ' + str(db_data['user_lightcolor'])
        }
    })
    change_value = ubi_data['userTemperature'].save_value({
        'value': db_data['user_temperature'],
        'context': {
            'description': ubi_data['userName'] + '\'s temperature is ' + str(db_data['user_temperature'])
        }
    })
    change_value = ubi_data['userSleepTime'].save_value({
        'value': db_data['user_sleeptime'],
        'context': {
            'description': ubi_data['userName'] + '\'s sleep time is ' + str(db_data['user_sleeptime'])
        }
    })
    change_value = ubi_data['userId'].save_value({
        'value': db_data['user_id'],
        'context': {
            'description': ubi_data['userName'] + '\'s id is ' + str(db_data['user_id'])
        }
    })
