from ubidots import ApiClient


def send_face(name):
    user_name = name
    api = ApiClient(token="BBFF-GfqBNxadAnLhwdTjCV0frdTPKwnnK6")
    user_face = api.get_variable('5bc2aba51d847271c8bac044')

    change_value = user_face.save_value({
        'value': 00,
        'context': {
            'user_name': user_name,
        },
        'description': 'The face of recognized person is ' + user_name
    })
