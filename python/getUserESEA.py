from urllib.request import Request, urlopen
import sys, json
from addHeaders import addHeaders

url = Request("https://play.esea.net/api/users/" + str(sys.argv[1]))
url = addHeaders(url)

try:
    content = urlopen(url, timeout=75).read()
except:
    print("getUser - error")
else: 
    user = json.loads(content)
    try:
        matchID = user["data"]["game_status"]["link"].replace("/match/","")
    except:
        print(False)
    else:
        print(matchID)