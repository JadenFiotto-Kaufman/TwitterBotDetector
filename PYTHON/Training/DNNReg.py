import tensorflow as tf
import sklearn as sk
import pandas as pd
class DNNReg:

    train_features = None
    label = "Class"
    def run(self, train,typ):

        self.train_features = list(train)
        self.train_features.remove('Username')
        self.train_features.remove('Class')
        x_train, x_test, y_train, y_test = sk.model_selection.train_test_split(train[self.train_features], train.Class , test_size=0.33,random_state=42)
        training_set = x_train[:]
        training_set['Class'] = y_train
        feature_cols = []
        for k in self.train_features:
            if k[0] == 'B':
                feature_cols.append(
                    tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_identity(key=k, num_buckets=2)))
            else:
                feature_cols.append(tf.feature_column.numeric_column(key=k))
        regressor = tf.estimator.DNNClassifier(feature_columns=feature_cols,activation_fn=tf.nn.relu, hidden_units=[10,  5],model_dir='models/'+typ,n_classes=2)
        regressor.train(input_fn=lambda: self.input_fn(training_set), steps=2000)
    def input_fn(self, data_set, pred=False):

        if pred == False:
            feature_cols = {k: tf.constant(data_set[k].values) for k in self.train_features}
            labels = tf.constant(data_set[self.label].values)

            return feature_cols, labels

        if pred == True:
            feature_cols = {k: tf.constant(data_set[k].values) for k in self.train_features}

            return feature_cols