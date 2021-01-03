cookie = ""

def addHeaders(url):
    url.add_header("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
    url.add_header("Accept-Language","en-US,en;q=0.5")
    url.add_header("Cache-Control","max-age=0")
    url.add_header("Connection","keep-alive")
    url.add_header("Cookie",cookie)
    url.add_header("DNT","1")
    url.add_header("Host","play.esea.net")
    url.add_header("TE","Trailers")
    url.add_header("Upgrade-Insecure-Requests","1")
    url.add_header("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0")
    url.add_header("origin","play.esea.net")
    return url