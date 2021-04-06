This version: August 8, 2019

This repository contains the replication material for "Citizen Evaluations of Legislator-Constituent Communication" to be published in the British Journal of Political Science. 

DATA FILES:

* study1_data.csv : cleaned dataset for Study 1
Variables:
- ID: respondent ID
- qualityrating: rating of overall quality, 0-100
- helpfulrating: rating of helpfulness, 0-100
- friendlyrating: rating of friendliness, 0-100
- dearjake: indicator if response contained named greeting (0=no 1=yes)
- answer: indicator if response contained answer to question (0=no 1=yes)
- days: how many days until response, 1-30

* study2_data.csv : cleaned dataset for Study 2
Variables:
- ID: respondent ID
- qualityrating: rating of overall quality, 0-100
- helpfulrating: rating of helpfulness, 0-100
- friendlyrating: rating of friendliness, 0-100
- dearjake: indicator if response contained named greeting (0=no 1=yes)
- answer: indicator if response contained answer to question (0=no 1=yes)
- days: how many days until response, 1-30

* study3_data.csv : cleaned dataset for Study 3
Variables:
- Email: Email ID
- rating: average satisfaction rating, 0-100
- invitefollowup: indicator if response contained an invitation to follow up (0=no 1=yes)
- namedsalut: indicator if response contained named greeting (0=no 1=yes)
- contacting: indicator if response contained contact information for another office/person (0=no 1=yes)
- words: number of words in response, inclusive of greeting and sign-off
- automated: indicator if response was automated (0=no 1=yes)
- question.answeered: indicator if response contained answer to question (0=no 1=yes)
- friendly: factor variable for friendliness (if namedsalut=1 & invitefollowup=0 = "Greeting"; if namedsalut=0 & invitefollowup=1 = "Invite"; if namedsalut=1 & invitefollowup=1 = "Greeting + Invite"; if namedsalut=0 & invitefollowup=0 = "Neither")
- content: factor variable for content of response (if question.answered=1 & contactinfo=0 = "Answer"; if question.answered=0 & contactinfo=1 = "Contact"; if question.answered=1 & contactinfo=1 = "Answer + Contact"; if answer=0 & contactinfo=0 = "Neither")


ANALYSIS:

* study1.R : R code to reproduce analyses for Study 1, including analyses in online Appendix
* study2.R : R code to reproduce analyses for Study 2, including analyses in online Appendix
* study3.R : R code to reproduce analyses for Study 3