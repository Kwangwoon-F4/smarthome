import pymongo


def mongoConn():
    # mongodb connection
    client = pymongo.MongoClient()
    db = client.userdata
    collection = db.userdata
    return collection

