from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse

app = Flask(__name__)
api = Api(app)


class CreateUser(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('user_id', type=int)
            parser.add_argument('user_name', type=str)
            parser.add_argument('user_humidity', type=int)
            parser.add_argument('user_light', type=int)
            parser.add_argument('user_lightcolor', type=int)
            parser.add_argument('user_temperature', type=int)
            parser.add_argument('user_sleeptime', type=int)
            args = parser.parse_args()

            _userId = args['user_id']
            _userName = args['user_name']
            _userHumidity = args['user_humidity']
            _userLight = args['user_light']
            _userLightcolor = args['user_lightcolor']
            _userTemperature = args['user_temperature']
            _userSleeptime = args['user_sleeptime']

            return {
                'Id': args['user_id'],
                'UserName': args['user_name'],
                'UserHumidity': args['user_humidity'],
                'UserLight': args['user_light'],
                'UserLightColor': args['user_lightcolor'],
                'UserTemperature': args['user_temperature'],
                'UserSleeptime': args['user_sleeptime']
            }
        except Exception as e:
            return {'error': str(e)}


api.add_resource(CreateUser, '/user')

if __name__ == '__main__':
    app.run(debug=True)
