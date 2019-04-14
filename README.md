# Heart Disease Project

## Run Project

### Backend

#### change directory to backend folder

    pip install -r requirements

    python app.py

### Frontend

#### change directory to heart-diseas folder

    npm install

    npm start

#### or

    yarn install

    yarn start

## Model Reproduction

1. <p> For Question 2, we use a random forest regression algorithm to analysis all important factors. We import SKlearn library and there is a random forest regression function we can use. And this function has an attribute feature_importance_ can show the importance of data after we train the data.</p>
2. <p>For Question 3, we use Logistic Regression to train the data. We split the 2/3 data into training set and the rest 1/3 data as testing set. We classify the predict result into two classes which is no heart disease(0) and has heart disease(1). After training the data and we got the fit model, we get input data from web app and use our training model to get the predict result and real predict probability. At last, we return the data to web app and display in it.</p>



