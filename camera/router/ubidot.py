from ubidots import ApiClient


def ubi_connect():
    print('ubi_connect()')
    api = ApiClient(token="BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV")
    # user values
    userHumidity = api.get_variable('5bdfc9511d8472353149343c')
    #	humidity = userHumidity.get_values(1)
    userLight = api.get_variable('5bdfc5db1d84723057db692f')
    #	light = userLight.get_values(1)
    userLightColor = api.get_variable('5bdfc98d1d847234fe29e864')
    #	lightColor = userLightColor.get_values(1)
    userTemperature = api.get_variable('5bdfc9441d84723531493427')
    #	temperature = userTemperature.get_values(1)
    userSleepTime = api.get_variable('5be171331d8472057999d414')
    #	sleepTime = userSleepTime.get_values(1)
    userId = api.get_variable('5bdfc97c1d8472353149348d')
    #	id = userId.get_values(1)
    # onOff = api.get_variable('5be2bb631d84723ffefdcb97')

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
