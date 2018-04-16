from DataExtractor import DataExtractor
import sys
username = sys.argv[1]
KEY = sys.argv[2]
SECRET = sys.argv[3]
filters = ""
Extractor = DataExtractor()
Extractor.Extract(username, filters, KEY, SECRET)
