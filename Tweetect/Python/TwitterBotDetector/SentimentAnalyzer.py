import pandas as pd     # To handle data
import numpy as np
from textblob import TextBlob
import re


class SentimentAnalyzer:
    def CleanTweet(self,tweet):
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
    def Analyze(self, tweet):
        return TextBlob(self.CleanTweet(tweet)).sentiment
    def SentimentAnalysis(self,tweets):
        totalAnalysis = [(tweet.text, self.Analyze(tweet.text)) for tweet in tweets]
        return self.SentimentReport(totalAnalysis)
    def SentimentReport(self, analysis):
        report = {}
        report['positiveNum'] = len([tweet for tweet in analysis if tweet[1].polarity > 0])
        report['positivePol'] = report['positiveNum'] / len([tweet for tweet in analysis])
        report['neutralNum'] = len([tweet for tweet in analysis if tweet[1].polarity == 0])
        report['neutralPol'] = report['neutralNum'] / len([tweet for tweet in analysis])
        report['negativeNum'] = len([tweet for tweet in analysis if tweet[1].polarity < 0])
        report['negativePol'] = report['negativeNum'] / len([tweet for tweet in analysis])
        report['average'] = np.mean([tweet[1].polarity for tweet in analysis])
        report['standardDeviation'] = np.std([tweet[1].polarity for tweet in analysis])
