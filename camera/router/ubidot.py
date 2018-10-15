from ubidots import ApiClient

class ubidot:
	def __init__(self):
		self.user_name = ''
		self.api = ApiClient(token="BBFF-GfqBNxadAnLhwdTjCV0frdTPKwnnK6")
	
	def send_face(name):
		user_face = self.api.get_variable('5bc2aba51d847271c8bac044')
		self.user_name = name
	
		if(self.user_name != ''):
			change_value = user_face.save_value({
				'value': 00,
				'context': {
					'user_name': self.user_name,
				},
				'description': 'The face of recognized person is ' + self.user_name
			})
