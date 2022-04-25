## Pipline Configuration

### Circleci 
```
version: 2.1    //version of pipeline
orbs:           //orb dependencies
  node: circleci/node@5.0.2
  aws-cli: circleci/aws-cli@1.3.1
  aws-elastic-beanstalk: circleci/aws-elastic-beanstalk@2.0.1
jobs:           //jobs to run pipeline
  build:
    filters:
      branches:
        only: master   //set the pipeline updated with master branch
    docker:
      - image: "cimg/base:stable"
    steps:          //steps to complete the pipeline job
      - node/install
      - checkout
      - aws-cli/setup
      - eb/setup
      - run:        //install frontend dependencies
          name: Front-End Install
          command: |
            npm run frontend:install
      - run:        //install backend dependencies
          name: Back-End Install
          command: |
            npm run backend:install
      - run:        //build frontend 
          name: Front-End Build
          command: |
            npm run frontend:build
      - run:        //build backend
          name: Back-End Build
          command: |
            npm run backend:build
      - run:        //test frontend
          name: Front-End Test
          command: |
            npm run frontend:test
      - run:        //deploy frontend on S3 
          name: Deploy Frontend
          command: |
            npm run frontend:deploy
      - run:        //deploy backend on EB
          name: Deploy Backend
          command: |
            - npm run backend:all
```