import tensorflow as tf
import itertools
import os
import sklearn as sk
import pandas as pd

BOT = 1
HUMAN = 0
class DNNReg:

    train_features = None
    label = "Class"
    def run(self, train,typ):

        self.train_features = list(train)
        feature_cols = []
        for k in self.train_features:
            if k[0] == 'B':
                feature_cols.append(
                    tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_identity(key=k, num_buckets=2)))
            else:
                feature_cols.append(tf.feature_column.numeric_column(key=k))
        direc = os.path.dirname(os.path.abspath(__file__))
        regressor = tf.estimator.DNNClassifier(feature_columns=feature_cols,activation_fn=tf.nn.relu, hidden_units=[10, 5],model_dir=direc+'\\models\\' + typ, n_classes=2)
        y = regressor.predict(input_fn=lambda: self.input_fn(train,pred=True))
        predictions = list(itertools.islice(y, train.shape[0]))
        return predictions[0]['probabilities'][BOT]
    def input_fn(self, data_set, pred=False):

        if pred == False:
            feature_cols = {k: tf.constant(data_set[k].values) for k in self.train_features}
            labels = tf.constant(data_set[self.label].values)

            return feature_cols, labels

        if pred == True:
            feature_cols = {k: tf.constant(data_set[k].values) for k in self.train_features}

            return feature_cols