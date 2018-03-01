import tweepy
from SentimentAnalyzer import SentimentAnalyzer
from datetime import datetime, timezone


consumer_key = 'Yq2nTsdKdK9PJukcuqXV1wNK0'
consumer_secret = 'T0iFhOH7lpWESscrRm4erUlM9FBiYfdXgoHdZhQqSUSkhzcVnZ'
access_token = '956558327265230848-10HVJZai0cbcFonR1TyPHaJhroMcoA1'
access_token_secret = 'V1wMppm5YHTUfp1NpFG551GEv3AtpXubG1PFuqElsRsOr'


authentication = tweepy.OAuthHandler(consumer_key, consumer_secret)
authentication.set_access_token(access_token, access_token_secret)
twitterStream = tweepy.Stream(authentication, 1)

TwitterAPI = tweepy.API(authentication)




class DataExtractor:
    def Extract(self, handle):
        USER = TwitterAPI.get_user(handle)
        TWEETS = TwitterAPI.user_timeline(screen_name=handle, count=200)
        SentAnalyzer = SentimentAnalyzer()
        SentimentReport = SentAnalyzer.SentimentAnalysis(TWEETS)
        return SentimentReport

# def Meta_Data(USER):
#     MetaData = {}
#     MetaData['screenNameLength'] = len(USER['screen_name'])
#     MetaData['screenNameDigits'] = sum([c.isdigit() for c in USER['screen_name']])
#     MetaData['userNameLength'] = len(USER['name'])
#     MetaData['timeOffset'] = USER['utc_offset']
#     MetaData['defaultProfile'] = USER['default_profile']
#     MetaData['defaultImage'] = USER['default_profile_image']
#     MetaData['profileBackgroundImage'] = USER['profile_use_background_image']
#     MetaData['verified'] = USER['verified']
#     MetaData['protected'] = USER['protected']
#     MetaData['timeOffset'] = USER['utc_offset']
#     date = datetime.strptime(USER['created_at'], '%a %b %d %H:%M:%S %z %Y')
#     age = (datetime.now(timezone.utc) - date).days
#     MetaData['ageDays'] = age
#     MetaData['descriptionLength'] = len(USER['description'])
#     MetaData['favoritesCount'] = USER['favourites_count']
#     MetaData['followersCount'] = USER['followers_count']
#     MetaData['friendsCount'] = USER['friends_count']
#     MetaData['listedCount'] = USER['listed_count']
#     MetaData['geoEnabled'] = USER['geo_enabled']
#     MetaData['language'] = USER['lang']

