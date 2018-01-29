import tweepy

consumer_key = 'Yq2nTsdKdK9PJukcuqXV1wNK0'
consumer_secret = 'T0iFhOH7lpWESscrRm4erUlM9FBiYfdXgoHdZhQqSUSkhzcVnZ'
access_token = '956558327265230848-10HVJZai0cbcFonR1TyPHaJhroMcoA1'
access_token_secret = 'V1wMppm5YHTUfp1NpFG551GEv3AtpXubG1PFuqElsRsOr'


authentication = tweepy.OAuthHandler(consumer_key, consumer_secret)
authentication.set_access_token(access_token, access_token_secret)
twitterStream = tweepy.Stream(authentication,1)

api = tweepy.API(authentication)
twitterAPI = api

timeline = twitterAPI.user_timeline("realDonaldTrump", count=200, include_rts=False)
print([tweet.text for tweet in timeline])