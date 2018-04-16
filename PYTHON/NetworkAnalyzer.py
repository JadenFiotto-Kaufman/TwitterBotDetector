import pandas as pd





class NetworkAnalyzer:
    def NetworkAnalysis(self, account):
        Network = {}
        Network['favoritesCount'] = account['favourites_count']
        Network['followersCount'] = account['followers_count']
        Network['friendsCount'] = account['friends_count']
        Network['listedCount'] = account['listed_count']

        return pd.Series(Network)