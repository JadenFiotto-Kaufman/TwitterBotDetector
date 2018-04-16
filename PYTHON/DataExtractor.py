import tweepy
import pandas as pd
from SentimentAnalyzer import SentimentAnalyzer
from TemporalAnalyzer import TemporalAnalyzer
from MetaDataAnalyzer import MetaDataAnalyzer
from NetworkAnalyzer import NetworkAnalyzer
from DNNReg import DNNReg

consumer_key = 'Yq2nTsdKdK9PJukcuqXV1wNK0'
consumer_secret = 'T0iFhOH7lpWESscrRm4erUlM9FBiYfdXgoHdZhQqSUSkhzcVnZ'

class DataExtractor:

    def Extract(self,username,filters, KEY, SECRET):
        authentication = tweepy.OAuthHandler(consumer_key, consumer_secret)
        authentication.set_access_token(KEY, SECRET)

        TwitterAPI = tweepy.API(authentication)



        resp = TwitterAPI.user_timeline(screen_name=username, count=200)
        tweets = [tweet._json for tweet in resp]
        user = tweets[0]['user']
        SentAnaly = SentimentAnalyzer()
        TempAnaly = TemporalAnalyzer()
        MetaAnaly = MetaDataAnalyzer()
        NetAnaly = NetworkAnalyzer()
        account = pd.Series()
        account = account.append(SentAnaly.SentimentAnalysis(tweets))
        account = account.append(TempAnaly.TemporalAnalysis(tweets))
        account = account.append(MetaAnaly.MetaDataAnalysis(user))
        account = account.append(NetAnaly.NetworkAnalysis(user))
        DNN = DNNReg()
        temp = list()
        temp.append(account)
        df = pd.DataFrame(temp)
        toints = ['Blanguage','BdefaultProfile','BdefaultImage','BprofileBackgroundImage','Bverified','Bprotected','BgeoEnabled']
        sentfeat = ['positiveNum', 'positivePol', 'neutralNum', 'neutralPol', 'negativeNum',
                    'negativePol', 'average', 'standardDeviation']
        metafeat = ['screenNameLength', 'screenNameDigits', 'accountNameLength', 'ageDays',
                    'descriptionLength', 'Blanguage', 'BdefaultProfile', \
                    'BdefaultImage', 'BprofileBackgroundImage', 'Bverified', 'Bprotected', 'BgeoEnabled']
        netfeat = ['favoritesCount', 'followersCount', 'friendsCount', 'listedCount']
        tempfeat = [ "tweetsPerDay", "tweetsPerMSecPerDay"]
        df[toints] = df[toints].astype(int)
        Final = DNN.run(df, "twee")
        Sent = DNN.run(df[sentfeat], "sent")
        Meta = DNN.run(df[metafeat], "meta")
        Temporal = DNN.run(df[tempfeat], "temp")
        Network = DNN.run(df[netfeat], "net")
        Lang = user['lang']
        ret = {'Final':Final,'Sentiment':Sent,'Meta':Meta,'Temporal':Temporal,'Network':Network,'Lang':Lang}
        print(ret,end='')
