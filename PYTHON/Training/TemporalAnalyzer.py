from datetime import datetime
from itertools import groupby
from datetime import timezone
import pandas as pd
class TemporalAnalyzer:

    def GetDateTime(self,tweet):
        return datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')
    def TemporalAnalysis(self,tweets):
        temp = {}
        times = [self.GetDateTime(tweet) for tweet in tweets]
        times.sort()
        x = (datetime.now(timezone.utc) - times[0]).days
        temp["tweetsPerDay"] = len(times) / (datetime.now(timezone.utc) - times[0]).days
        dayGrouped = [list(group) for k, group in groupby(times,key=datetime.toordinal)]
        total = 0
        n = 0
        for gr in dayGrouped:
            gr.sort()
            for i in range(0,len(gr)-1):
                n = n + 1
                total = total + (gr[i+1] - gr[i]).seconds
        temp["tweetsPerMSecPerDay"] = total / n if n > 0 else 0
        return pd.Series(temp)
