## Pipline Configuration

### Circleci 
```
version: 2.1
orbs:
  node: circleci/node@5.0.2                     #install node
  aws-cli: circleci/aws-cli@1.3.1              #install aws
  eb: circleci/aws-elastic-beanstalk@2.0.1     #install eb

jobs:
  test-frontend:
    docker:
      - image: "cimg/base:stable"
    steps:
      - node/install
      - run:        #install Frontend dependencies
          name: Front-End Install    
          command: |
            npm run frontend:install
      - run:        #build frontend 
          name: Front-End Build
          command: |
            npm run frontend:build
      - run:        #test frontend
          name: Front-End Test
          command: |
            npm run frontend:test

  deploy:
    docker:
      - image: "cimg/base:stabel"
    steps:
      -node/install
      -checkout
      -aws-cli/setup
      -eb/setup
      - run:        #install Frontend dependencies
          name: Front-End Install    
          command: |
            npm run frontend:install
      - run:        #install Backend dependencies
          name: Back-End Install
          command: |
            npm run backend:install
      - run:        #build frontend 
          name: Front-End Build
          command: |
            npm run frontend:build
      - run:        #build backend
          name: Back-End Build
          command: |
            npm run backend:build
        - run:        #deploy frontend on S3
          name: Deploy Frontend
          command: |
            npm run frontend:deploy
        - run:
          name: Set new EB env
          command: |
            npm run backend:setenv
       - run:        #deploy backend to EB
          name: Deploy Backend
          command: |
            npm run backend:deploy

workflows:
  workflow:
    jobs:
      - test-frontend:
          filters:
            branches:
              only: master      
      - debploy:
          requires:
          - test-frontend
          filters:
            branches:
              only: master
```