## Pipline Configuration

### Circleci 
```
version: 2.1
orbs:
  node: circleci/node@5.0.2
  aws-cli: circleci/aws-cli@1.3.1
  aws-elastic-beanstalk: circleci/aws-elastic-beanstalk@2.0.1

jobs:
  build:
    docker:
      - image: "cimg/base:stable"
    steps:
      - node/install
      - checkout
      - aws-cli/setup
      - eb/setup
      - run:
        command: |
          npm run frontend:install
      - run:
        command: |
          npm run backend:install
      - run:
        command: |
          npm run frontend:build
      - run:
        command: |
          npm run backend:build
      - run:
        command: |
          npm run frontend:test
      - run:
        command: |
          npm run frontend:deploy
      - run:
        command: |
          npm run backend:all


workflows:
  workflow:
    jobs:
      - build:
         filters:
            branches:
              only: master
```