from datetime import datetime
from datetime import timezone
import pandas as pd



class MetaDataAnalyzer:
    
    def MetaDataAnalysis(self, account):

        MetaData = {}
        MetaData['screenNameLength'] = len(account['screen_name'])
        MetaData['screenNameDigits'] = sum([c.isdigit() for c in account['screen_name']])
        MetaData['accountNameLength'] = len(account['name'])
        date = datetime.strptime(account['created_at'], '%a %b %d %H:%M:%S %z %Y')
        age = (datetime.now(timezone.utc) - date).days
        MetaData['ageDays'] = age
        MetaData['descriptionLength'] = len(account['description'])

        MetaData['Blanguage'] = 1 if account['lang'] == 'en' else 0
        MetaData['BdefaultProfile'] = 1 if account['default_profile'] else 0
        MetaData['BdefaultImage'] = 1 if account['default_profile_image'] else 0
        MetaData['BprofileBackgroundImage'] = 1 if account['profile_use_background_image'] else 0
        MetaData['Bverified'] = 1 if account['verified'] else 0
        MetaData['Bprotected'] = 1 if account['protected'] else 0
        MetaData['BgeoEnabled'] = 1 if account['geo_enabled'] else 0
        return pd.Series(MetaData)