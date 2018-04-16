import tweepy
import pickle as pkl
import pandas as pd
from SentimentAnalyzer import SentimentAnalyzer
from TemporalAnalyzer import TemporalAnalyzer
from MetaDataAnalyzer import MetaDataAnalyzer
from NetworkAnalyzer import NetworkAnalyzer
from DNNReg import DNNReg
import os


consumer_key = 'Yq2nTsdKdK9PJukcuqXV1wNK0'
consumer_secret = 'T0iFhOH7lpWESscrRm4erUlM9FBiYfdXgoHdZhQqSUSkhzcVnZ'
access_token = '956558327265230848-10HVJZai0cbcFonR1TyPHaJhroMcoA1'
access_token_secret = 'V1wMppm5YHTUfp1NpFG551GEv3AtpXubG1PFuqElsRsOr'


authentication = tweepy.OAuthHandler(consumer_key, consumer_secret)
authentication.set_access_token(access_token, access_token_secret)
twitterStream = tweepy.Stream(authentication, 1)

TwitterAPI = tweepy.API(authentication)


BOT = 0
HUMAN = 1

class DataExtractor:
    BOT = 0
    HUMAN = 1
    def Extract(self):
        direc = os.path.dirname(os.path.abspath(__file__))
        bots = pkl.load(open(direc+"\\pklbots.p","rb"))
        reals = pkl.load(open(direc+"\\pklreals.p","rb"))
        data = list()
        NetAnaly = NetworkAnalyzer()
        SentAnaly = SentimentAnalyzer()
        TempAnaly = TemporalAnalyzer()
        MetaAnaly = MetaDataAnalyzer()
        for bot in bots:
            account = pd.Series({'Username': bot['username'], 'Class': 1})
            if len(bot['tweets']) > 0:

                account = account.append(SentAnaly.SentimentAnalysis(bot['tweets']))
                account = account.append(TempAnaly.TemporalAnalysis(bot['tweets']))
                account = account.append(MetaAnaly.MetaDataAnalysis(bot['tweets'][0]['user']))
                account = account.append(NetAnaly.NetworkAnalysis(bot['tweets'][0]['user']))
                data.append(account)

        for user in reals:
            account = pd.Series({'Username': user['username'], 'Class': 0})
            if len(user['tweets']) > 0:
                account = account.append(SentAnaly.SentimentAnalysis(user['tweets']))
                account = account.append(TempAnaly.TemporalAnalysis(user['tweets']))
                account = account.append(MetaAnaly.MetaDataAnalysis(user['tweets'][0]['user']))
                account = account.append(NetAnaly.NetworkAnalysis(user['tweets'][0]['user']))
                data.append(account)
        DNN = DNNReg()
        toints = ['Blanguage', 'BdefaultProfile', 'BdefaultImage', 'BprofileBackgroundImage', 'Bverified', 'Bprotected',
                  'BgeoEnabled']
        sentfeat = ['Username','Class','positiveNum','positivePol','neutralNum','neutralPol','negativeNum','negativePol','average','standardDeviation']
        metafeat = ['Username','screenNameLength','screenNameDigits','accountNameLength','ageDays','descriptionLength','Blanguage','BdefaultProfile', \
        'BdefaultImage','BprofileBackgroundImage','Bverified','Bprotected','BgeoEnabled','Class']
        netfeat = ['Username','Class','favoritesCount','followersCount','friendsCount','listedCount']
        tempfeat = ['Username', 'Class',"tweetsPerDay", "tweetsPerMSecPerDay"]
        df = pd.DataFrame(data)
        df[toints] = df[toints].astype(int)
        DNN.run(df, "twee")
        DNN.run(df[sentfeat], "sent")
        DNN.run(df[metafeat], "meta")
        DNN.run(df[netfeat], "net")
        DNN.run(df[tempfeat], "temp")
















    def GetHandles(self):
        bots = pd.read_csv("bots.csv")
        bots = pd.Series.to_frame(bots.screen_name)
        bots = bots.assign(type=pd.Series([0]* bots.shape[0]).values)
        reals = pd.read_csv("nots.csv")
        reals = pd.Series.to_frame(reals.screen_name)
        reals = reals.assign(type=pd.Series([1]* reals.shape[0]).values)
        return pd.concat([bots,reals])
    def Save(self,data):
        bots = data.loc[data.type == 0]
        ranbots = bots.sample(n=700)
        reals = data.loc[data.type == 1]
        ranreals= reals.sample(n=700)

        pklbots =list()
        for index, row in ranbots.iterrows():
            print("done " + row.screen_name)
            dicttt = {'username': row.screen_name}
            try:
                tweets = TwitterAPI.user_timeline(screen_name=row.screen_name, count=200)
            except tweepy.TweepError as e:
                print(e)
            else:
                jsontweets = [tweet._json for tweet in tweets]
                dicttt['tweets'] = jsontweets
                pklbots.append(dicttt)
        pkl.dump(pklbots,open("pklbots.p","wb"))
        pklreals = list()
        for index, row in ranreals.iterrows():
            print("done " + row.screen_name)
            dicttt = {'username': row.screen_name}
            try:
                tweets = TwitterAPI.user_timeline(screen_name=row.screen_name, count=200)
            except tweepy.TweepError as e:
                print(e)
            else:
                jsontweets = [tweet._json for tweet in tweets]
                dicttt['tweets'] = jsontweets
                pklreals.append(dicttt)
        pkl.dump(pklreals, open("pklreals.p", "wb"))
    def testing(self, data):
        None
# def Meta_Data(USER):


