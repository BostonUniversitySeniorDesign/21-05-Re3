# README_HARDWARE - RE3 (Reproducibility, Reusability, Readability)

## Access our platform here

[re3.ai](https://re3.ai)

## Hardware Report Overview

Our project consists of software only and does not have any hardware required from the user’s end except for a computer to access our website. However, our platform makes use of google cloud instances and google app engine.

### Google App Instances

Since we are very much in the prototype stage, our deployment of the readability model currently works to minimize our cost. Specifically, our server is running on an instance using the instance class B1 containing 256 MB of memory, 600 MHz CPU limit, and Basic Scaling. As of now, basic scaling is set to have a max number of instances of 1 to once again minimize cost.

In order to deploy the readability model on Google App Engine, you must:

clone the repo into the google cloud terminal using:

```
git clone https://github.com/BostonUniversitySeniorDesign/21-05-Re3.git
```

cd into the flask app directory

```
cd Re3-readability/flask_api/app
```

Deploy flask app. The configuration settings are already set up in the app.yaml file.

```
gcloud app deploy
```

## Contributors

- [Andreas Francisco De Melo Oliveira](https://github.com/andoliv1)
- [Ethan Hung](https://github.com/ehungbu)
- [Jyotsna Penumaka](https://github.com/jyotsna-penumaka)
- [Layan Bahaidarah](https://github.com/layanb98)
- [Lukas Rosario](https://github.com/lukasrosario)
- [Ana Trisovic](https://github.com/atrisovic)
