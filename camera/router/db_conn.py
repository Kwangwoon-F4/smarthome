import pymongo


def mongoConn():
    # mongodb connection
    print('mongoConn()')
    client = pymongo.MongoClient()
    db = client.userdata
    collection = db.userdata
    return collection

