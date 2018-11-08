from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_cors import CORS
from .db_conn import mongoConn

app = Flask(__name__)
api = Api(app)
CORS(app)


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

            collections = mongoConn()
            # print(collections.find_one({'user_name': 'wonjae'}))

            findResult = collections.find_one({'user_name': 'no-name'})
            if findResult is not None:
                print("order user removed")
                collections.remove({'user_name': 'no-name'})

            i = 0
            while 1:
                i = i + 1
                if (collections.find_one({'user_id': i})) is None:
                    _userId = i
                    break

            # _userId = args['user_id']
            _userName = args['user_name']
            _userHumidity = args['user_humidity']
            _userLight = args['user_light']
            _userLightcolor = args['user_lightcolor']
            _userTemperature = args['user_temperature']
            _userSleeptime = args['user_sleeptime']

            _id = collections.insert({
                'user_id': _userId,
                'user_name': _userName,
                'user_humidity': _userHumidity,
                'user_light': _userLight,
                'user_lightcolor': _userLightcolor,
                'user_temperature': _userTemperature,
                'user_sleeptime': _userSleeptime
            })

            # new_user = collections.find_one({'_id': _id})

            return {
                'Id': _userId,
                'UserName': args['user_name'],
                'UserHumidity': args['user_humidity'],
                'UserLight': args['user_light'],
                'UserLightColor': args['user_lightcolor'],
                'UserTemperature': args['user_temperature'],
                'UserSleeptime': args['user_sleeptime'],
                # 'NewUser': new_user
            }
        except Exception as e:
            return {'error': str(e)}


api.add_resource(CreateUser, '/user')
#api.add_resource(Capture.video_feed(), '/capture')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
